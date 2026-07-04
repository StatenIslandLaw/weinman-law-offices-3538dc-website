import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

// Use require for CommonJS Babel modules
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Source editing is only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { file, line, oldText, newText, isImageSrcReplacement } = body;

    // Validate inputs
    if (!file || line === undefined || newText === undefined) {
      return NextResponse.json(
        { error: 'Missing required parameters: file, line, newText' },
        { status: 400 }
      );
    }

    // Security: Ensure the file is within the project directory
    const projectRoot = process.cwd();
    const absolutePath = path.resolve(projectRoot, file);
    
    if (!absolutePath.startsWith(projectRoot)) {
      return NextResponse.json(
        { error: 'Invalid file path - must be within project directory' },
        { status: 403 }
      );
    }

    // Check if file exists
    try {
      await fs.access(absolutePath);
    } catch {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read the file
    const fileContent = await fs.readFile(absolutePath, 'utf-8');

    // Parse the file into an AST
    const ast = parser.parse(fileContent, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    let textNodeFound = false;
    let replacementMade = false;
    const debugInfo: string[] = [];
    let bestMatchElement: { path: unknown; openingElement: unknown; elementNode: unknown } | null = null;
    let bestMatchSpan = Infinity;

      // Handle image src replacement differently
      if (isImageSrcReplacement) {
        traverse(ast, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          JSXElement(path: any) {
          const openingElement = path.node.openingElement;
          
          // Check if this element is on the target line
          const elementLine = openingElement.loc?.start.line;
          
          if (elementLine === line) {
            // Find and replace the src attribute
            const attributes = openingElement.attributes;
            for (let i = 0; i < attributes.length; i++) {
              const attr = attributes[i];
              if (attr.type === 'JSXAttribute' && attr.name.name === 'src') {
                // Replace the src value with the new image URL as a string literal
                // If it was a JSX expression (e.g., {PROFESSIONAL_IMAGES[0]}), convert to string
                attr.value = {
                  type: 'StringLiteral',
                  value: newText,
                };
                replacementMade = true;
                debugInfo.push(`Replaced src attribute on line ${line} with "${newText}"`);
                break;
              }
            }
          }
        }
      });

      if (replacementMade) {
        // Generate updated code
        const output = generate(ast, {
          retainLines: true,
          retainFunctionParens: true,
        });

        // Write the updated code back to the file
        await fs.writeFile(absolutePath, output.code, 'utf-8');

        return NextResponse.json({ 
          success: true, 
          message: 'Image src updated successfully',
          debug: debugInfo 
        });
      } else {
        return NextResponse.json(
          { 
            error: 'Could not find src attribute at the specified line',
            debug: debugInfo 
          },
          { status: 400 }
        );
      }
    }

    // First, find the most specific (smallest/innermost) element containing the target line
    traverse(ast, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      JSXElement(path: any) {
        const openingElement = path.node.openingElement;
        const elementNode = path.node;
        
        // Check if this element contains the target line
        const elementStartLine = openingElement.loc?.start.line;
        const elementEndLine = elementNode.loc?.end.line;
        
        if (elementStartLine && elementEndLine && 
            line >= elementStartLine && line <= elementEndLine) {
          // Calculate span (smaller span = more specific element)
          const span = elementEndLine - elementStartLine;
          
          // Keep the smallest (most specific) match
          if (span < bestMatchSpan) {
            bestMatchSpan = span;
            bestMatchElement = { path, openingElement, elementNode };
          }
        }
      }
    });

    debugInfo.push(`Best match found: ${bestMatchElement ? 'YES' : 'NO'}`);
    
    // Now process the best match
    if (bestMatchElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { openingElement, elementNode } = bestMatchElement as any;
      
      const elementStartLine = openingElement.loc?.start.line;
      const elementEndLine = elementNode.loc?.end.line;
      
      // Handle both standard elements (h1, div) and custom components (Link, Button)
      let elementName = 'unknown';
      if (openingElement.name.type === 'JSXIdentifier') {
        elementName = openingElement.name.name;
      } else if (openingElement.name.type === 'JSXMemberExpression') {
        elementName = openingElement.name.property?.name || 'unknown';
      }
      
      debugInfo.push(`Found element: <${elementName}> spanning lines ${elementStartLine}-${elementEndLine}`);
      debugInfo.push(`Target line: ${line}`);
      debugInfo.push(`Children count: ${elementNode.children?.length || 0}`);
      
      // Simple approach: Replace ALL content of this element with the new text
      // No need for complex matching - we already know this is the right element!
      const children = elementNode.children || [];
      
      if (children.length > 0) {
        debugInfo.push(`Replacing all ${children.length} children with new text`);
        
        // Replace first child with new text node, remove all others
        children[0] = {
          type: 'JSXText',
          value: newText,
        };
        children.splice(1);
        
        textNodeFound = true;
        replacementMade = true;
      } else {
        debugInfo.push(`Element has no children - cannot replace content`);
      }
    }

    // Keep the old matching logic as fallback for edge cases
    if (!replacementMade && bestMatchElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { elementNode } = bestMatchElement as any;
      const trimmedOld = oldText.trim();
      const normalizedOld = trimmedOld.replace(/\s+/g, ' ');
      
      // Helper to normalize whitespace in text (collapse multiple spaces/newlines to single space)
      const normalizeWhitespace = (text: string): string => {
        return text.trim().replace(/\s+/g, ' ');
      };
      
      // Helper function to collect all JSXText and JSXExpressionContainer nodes from an element's children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const collectContentNodes = (node: any): any[] => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const contentNodes: any[] = [];
        
        if (node.type === 'JSXText') {
          contentNodes.push({ type: 'text', node });
        } else if (node.type === 'JSXExpressionContainer') {
          // Include expression containers - we'll replace them with literal text if edited
          contentNodes.push({ type: 'expression', node });
        } else if (node.type === 'JSXElement') {
          const children = node.children || [];
          for (const child of children) {
            contentNodes.push(...collectContentNodes(child));
          }
        }
        
        return contentNodes;
      };
      
      // Helper function to recursively search for text in all descendants
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const searchTextInNode = (node: any, depth: number = 0): boolean => {
        const indent = '  '.repeat(depth);
        
        if (node.type === 'JSXText') {
          const nodeTextDecoded = decodeHTMLEntities(node.value);
          const trimmedNode = nodeTextDecoded.trim();
          const normalizedNode = normalizeWhitespace(nodeTextDecoded);
          
          debugInfo.push(`${indent}JSXText: "${trimmedNode}"`);
          
          // Try exact match (normalized)
          if (normalizedNode === normalizedOld) {
            debugInfo.push(`${indent}✓ Exact match (normalized)!`);
            node.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
          
          // Try exact match (trimmed, not normalized)
          if (trimmedNode === trimmedOld) {
            debugInfo.push(`${indent}✓ Exact match!`);
            node.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
          
          // Try partial match
          if (trimmedNode.includes(trimmedOld)) {
            debugInfo.push(`${indent}✓ Partial match!`);
            const decodedValue = decodeHTMLEntities(node.value);
            const oldTextIndex = decodedValue.indexOf(trimmedOld);
            
            if (oldTextIndex !== -1) {
              const before = decodedValue.substring(0, oldTextIndex);
              const after = decodedValue.substring(oldTextIndex + trimmedOld.length);
              node.value = before + newText + after;
              textNodeFound = true;
              replacementMade = true;
              return true;
            }
          }
          
          // Check if part of larger selection
          if (trimmedNode && trimmedOld.includes(trimmedNode)) {
            debugInfo.push(`${indent}✓ Part of search string`);
            const indexInOld = trimmedOld.indexOf(trimmedNode);
            
            if (indexInOld !== -1) {
              const beforeTextInOld = trimmedOld.substring(0, indexInOld);
              const newTextTrimmed = newText.trim();
              const beforeLength = beforeTextInOld.length;
              const newTextForNode = newTextTrimmed.substring(beforeLength);
              
              const leadingWhitespace = node.value.match(/^\s*/)?.[0] || '';
              const trailingWhitespace = node.value.match(/\s*$/)?.[0] || '';
              node.value = leadingWhitespace + newTextForNode + trailingWhitespace;
              textNodeFound = true;
              replacementMade = true;
              return true;
            }
          }
        } else if (node.type === 'JSXElement') {
          debugInfo.push(`${indent}JSXElement (searching children...)`);
          
          // Collect all content nodes (text + expressions) from this element
          const contentNodes = collectContentNodes(node);
          
          if (contentNodes.length > 0) {
            // Check if we have any expressions mixed with text
            const hasExpressions = contentNodes.some(n => n.type === 'expression');
            const textOnlyNodes = contentNodes.filter(n => n.type === 'text');
            
            if (hasExpressions) {
              debugInfo.push(`${indent}Element contains ${contentNodes.length} content nodes (${textOnlyNodes.length} text, ${contentNodes.length - textOnlyNodes.length} expressions)`);
              debugInfo.push(`${indent}Note: This element contains dynamic expressions. If edited, they will be replaced with literal text.`);
              
              // For elements with expressions, use fuzzy matching
              // The browser shows rendered text, but we only have the literal text parts
              
              // Get individual text parts (don't join them yet - they may be separated by expressions)
              const textParts = textOnlyNodes
                .map(n => normalizeWhitespace(decodeHTMLEntities(n.node.value)))
                .filter(t => t.length > 0); // Filter out empty/whitespace-only nodes
              
              debugInfo.push(`${indent}Text parts (${textParts.length}): ${textParts.map(t => `"${t}"`).join(', ')}`);
              debugInfo.push(`${indent}Looking for: "${normalizedOld}"`);
              
              let isLikelyMatch = false;
              
              if (textParts.length > 0) {
                // Strategy 1: Text only at the beginning (e.g., "Call Now: " + expression)
                // Check if oldText starts with our first text part
                if (normalizedOld.startsWith(textParts[0]) && textParts[0].length > 3) {
                  debugInfo.push(`${indent}Match strategy: oldText starts with first text part`);
                  isLikelyMatch = true;
                }
                
                // Strategy 2: Text at beginning and end (e.g., "Contact " + expression + " today")
                // Check if we can find all text parts in order within oldText
                if (!isLikelyMatch && textParts.length > 1) {
                  let searchPos = 0;
                  let allPartsFound = true;
                  for (const part of textParts) {
                    const foundAt = normalizedOld.indexOf(part, searchPos);
                    if (foundAt === -1) {
                      allPartsFound = false;
                      break;
                    }
                    searchPos = foundAt + part.length;
                  }
                  if (allPartsFound) {
                    debugInfo.push(`${indent}Match strategy: all text parts found in order`);
                    isLikelyMatch = true;
                  }
                }
                
                // Strategy 3: Single substantial text part contained in oldText
                if (!isLikelyMatch && textParts.length === 1 && textParts[0].length > 5) {
                  if (normalizedOld.includes(textParts[0])) {
                    debugInfo.push(`${indent}Match strategy: substantial text part contained in oldText`);
                    isLikelyMatch = true;
                  }
                }
              }
              
              if (isLikelyMatch) {
                debugInfo.push(`${indent}✓ Fuzzy match with expressions!`);
                
                // Replace ALL content (text + expressions) with literal text
                const children = node.children || [];
                
                if (children.length > 0) {
                  // Create a new JSXText node with the new content
                  children[0] = {
                    type: 'JSXText',
                    value: newText,
                  };
                  // Remove all other children (expressions and other text nodes)
                  children.splice(1);
                }
                
                textNodeFound = true;
                replacementMade = true;
                return true;
              }
            } else if (textOnlyNodes.length > 0) {
              // No expressions - standard matching
              const combinedText = textOnlyNodes
                .map(n => decodeHTMLEntities(n.node.value))
                .join('');
              const normalizedCombined = normalizeWhitespace(combinedText);
              
              debugInfo.push(`${indent}Combined text from ${textOnlyNodes.length} text nodes: "${normalizedCombined}"`);
              
              // Check if combined text matches
              if (normalizedCombined === normalizedOld) {
                debugInfo.push(`${indent}✓ Combined text match!`);
                
                // No expressions - just replace text nodes
                textOnlyNodes[0].node.value = newText;
                for (let i = 1; i < textOnlyNodes.length; i++) {
                  textOnlyNodes[i].node.value = '';
                }
                
                textNodeFound = true;
                replacementMade = true;
                return true;
              }
            }
          }
          
          // Recursively search children if no combined match
          const children = node.children || [];
          for (const child of children) {
            if (searchTextInNode(child, depth + 1)) {
              return true;
            }
          }
        } else if (node.type === 'JSXExpressionContainer' && 
                   node.expression.type === 'StringLiteral') {
          debugInfo.push(`${indent}JSXExpression: "${node.expression.value}"`);
          if (node.expression.value === oldText) {
            node.expression.value = newText;
            textNodeFound = true;
            replacementMade = true;
            return true;
          }
        }
        
        return false;
      };
      
      // Search through all descendants recursively
      debugInfo.push(`Searching for: "${trimmedOld}"`);
      const children = elementNode.children || [];
      for (let i = 0; i < children.length; i++) {
        if (searchTextInNode(children[i], 0)) {
          break;
        }
      }
    }

    // Also check for JSX attributes (less common but possible)
    if (!replacementMade) {
      traverse(ast, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSXAttribute(path: any) {
          const node = path.node;
          
          // Check if this is a string literal attribute on the target line
          if (node.loc && node.loc.start.line === line && 
              node.value && node.value.type === 'StringLiteral') {
            const attrValue = node.value.value;
            
            if (attrValue === oldText) {
              node.value.value = newText;
              textNodeFound = true;
              replacementMade = true;
              path.stop();
            }
          }
        }
      });
    }

    if (!textNodeFound) {
      console.error('Debug info:', debugInfo.join('\n'));
      return NextResponse.json(
        { 
          error: `No editable text found at line ${line}. The element might not contain direct text content.`,
          details: 'Try selecting the text content directly, not the container element.',
          debug: debugInfo
        },
        { status: 400 }
      );
    }

    if (!replacementMade) {
      console.error('Debug info:', debugInfo.join('\n'));
      return NextResponse.json(
        { 
          error: 'Text mismatch - the source may have changed since page load',
          debug: debugInfo
        },
        { status: 400 }
      );
    }

    // Generate the updated source code
    const output = generate(ast, {
      retainLines: true,
      compact: false,
    });

    // Write the updated content back to the file
    await fs.writeFile(absolutePath, output.code, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'File updated successfully',
      file: file,
      line,
    });

  } catch (error) {
    console.error('Source edit error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to update source file' 
      },
      { status: 500 }
    );
  }
}

// Helper to decode HTML entities (handles &amp; &lt; &gt; &quot; etc.)
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  return text.replace(/&[a-z]+;|&#\d+;/gi, (match) => entities[match] || match);
}
