/**
 * Custom webpack loader that injects source file and line metadata into JSX elements
 * This adds data-source-file and data-source-line attributes to all JSX elements in dev mode
 * 
 * Enhanced to track prop origins: When string literals are passed as props, they're wrapped
 * in fragments with source tracking, so the rendered content knows where it came from.
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

module.exports = function jsxSourceLoader(source) {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') {
    return source;
  }

  const filename = this.resourcePath;
  
  // Only process TSX and JSX files
  if (!filename.endsWith('.tsx') && !filename.endsWith('.jsx')) {
    return source;
  }

  try {
    // Parse the source code into an AST
    const ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    // Traverse the AST and inject source attributes into JSX elements
    traverse(ast, {
      JSXOpeningElement(path) {
        const { node } = path;
        
        // Skip if this is a Fragment or already has source data
        if (t.isJSXFragment(node) || 
            node.attributes.some(attr => 
              t.isJSXAttribute(attr) && 
              attr.name.name === 'data-source-file'
            )) {
          return;
        }

        const line = node.loc?.start.line;
        const column = node.loc?.start.column;

        if (line) {
          // Add data-source-file attribute
          node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-source-file'),
              t.stringLiteral(filename)
            )
          );

          // Add data-source-line attribute
          node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-source-line'),
              t.stringLiteral(String(line))
            )
          );

          // Add data-source-column attribute
          if (column !== undefined) {
            node.attributes.push(
              t.jsxAttribute(
                t.jsxIdentifier('data-source-column'),
                t.stringLiteral(String(column))
              )
            );
          }
        }

        // PROP ORIGIN TRACKING: Wrap string literal props in fragments with source data
        // This allows the rendered content to know where the prop value was defined
        node.attributes.forEach((attr, index) => {
          if (t.isJSXAttribute(attr) && 
              attr.value && 
              t.isStringLiteral(attr.value) &&
              attr.value.value.trim().length > 0 && // Skip empty strings
              !attr.name.name.startsWith('data-') && // Skip our own data attributes
              attr.name.name !== 'className' && // Skip className (too noisy)
              attr.name.name !== 'id' && // Skip id
              attr.name.name !== 'key' && // Skip React internals
              attr.name.name !== 'href' && // Skip links (usually not edited)
              attr.name.name !== 'src' && // Skip image sources (handled separately)
              attr.name.name !== 'alt' // Skip alt text for now
          ) {
            const propLine = attr.value.loc?.start.line || line;
            const propColumn = attr.value.loc?.start.column || column;

            // Create a fragment wrapper with source tracking:
            // title="Hello" becomes title={<>Hello</>} with source attributes
            const fragment = t.jsxFragment(
              t.jsxOpeningFragment(),
              t.jsxClosingFragment(),
              [t.jsxText(attr.value.value)],
              );
            
            // Add source attributes to the fragment opening element
            // We need to create a proper JSX element instead of a fragment for attributes
            // So we wrap in a span with source data
            const wrapper = t.jsxElement(
              t.jsxOpeningElement(
                t.jsxIdentifier('span'),
                [
                  t.jsxAttribute(
                    t.jsxIdentifier('data-source-file'),
                    t.stringLiteral(filename)
                  ),
                  t.jsxAttribute(
                    t.jsxIdentifier('data-source-line'),
                    t.stringLiteral(String(propLine))
                  ),
                  t.jsxAttribute(
                    t.jsxIdentifier('data-source-column'),
                    t.stringLiteral(String(propColumn))
                  ),
                ],
                false
              ),
              t.jsxClosingElement(t.jsxIdentifier('span')),
              [t.jsxText(attr.value.value)],
              false
            );

            // Replace the string literal with a JSX expression containing our wrapper
            node.attributes[index] = t.jsxAttribute(
              attr.name,
              t.jsxExpressionContainer(wrapper)
            );
          }
        });
      },
    });

    // Generate code from the modified AST
    const output = generate(ast, {
      retainLines: true,
      compact: false,
    }, source);

    return output.code;
  } catch (error) {
    // If parsing fails, just return the original source
    console.warn(`jsx-source-loader: Failed to parse ${filename}:`, error.message);
    return source;
  }
};
