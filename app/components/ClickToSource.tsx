'use client';

import { useEffect, useState } from 'react';
import ImageEditDialog from './ImageEditDialog';

// Files/patterns that should not be editable
const NON_EDITABLE_FILES = [
  /ImageEditDialog\.tsx$/,
  /ClickToSource\.tsx$/,
  /LeadForm\.tsx$/,
  /Testimonials\.tsx$/,
  /Chat\.tsx$/,
  /FloatingChat\.tsx$/,
  /PoweredByBreezy\.tsx$/, // Breezy branding badge
  /CustomBuildErrorOverlay\.tsx$/,
  /DevErrorBoundary\.tsx$/,
  /error\.tsx$/,
  /global-error\.tsx$/,
  /not-found\.tsx$/,
  /loading\.tsx$/,
  // Add more patterns as needed
];

// Tag names that should never be selected for editing
const NON_SELECTABLE_TAGS = ['DIV', 'SECTION', 'MAIN', 'FOOTER', 'SVG'];

export default function ClickToSource({ debug_mode }: { debug_mode: string }) {
  const [imageDialogState, setImageDialogState] = useState<{
    isOpen: boolean;
    element: HTMLElement | null;
    currentSrc: string;
  }>({ isOpen: false, element: null, currentSrc: '' });

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Don't run in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preview') === 'true') {
      return;
    }

    let currentEditElement: HTMLElement | null = null;
    let currentHoverElement: HTMLElement | null = null;
    let originalContent: string = '';
    let originalStyles: { outline?: string; cursor?: string; position?: string; zIndex?: string } = {};
    let hoverStyles: { outline?: string; cursor?: string; position?: string; zIndex?: string } = {};
    let editButton: HTMLButtonElement | null = null;

    const createEditButton = (element: HTMLElement): HTMLButtonElement => {
      const button = document.createElement('button');
      button.textContent = '✏️';
      button.dataset.editButton = 'true'; // Mark as edit button to prevent flickering
      
      // Get element position for fixed positioning
      const rect = element.getBoundingClientRect();
      
      button.style.cssText = `
        position: fixed;
        top: ${rect.top - 14}px;
        left: ${rect.right - 14}px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: background 0.2s, transform 0.2s;
        pointer-events: auto;
      `;
      
      button.onmouseenter = () => {
        button.style.background = '#2563eb';
        button.style.transform = 'scale(1.15)';
      };
      button.onmouseleave = () => {
        button.style.background = '#3b82f6';
        button.style.transform = 'scale(1)';
      };
      
      return button;
    };

    const exitEditMode = () => {
      if (currentEditElement) {
        currentEditElement.contentEditable = 'false';
        currentEditElement.style.outline = originalStyles.outline || '';
        currentEditElement.style.cursor = originalStyles.cursor || '';
        if (originalStyles.position) {
          currentEditElement.style.position = originalStyles.position;
        }
        currentEditElement = null;
        originalContent = '';
      }
    };

    const exitHoverMode = () => {
      if (currentHoverElement && currentHoverElement !== currentEditElement) {
        currentHoverElement.style.outline = hoverStyles.outline || '';
        currentHoverElement.style.cursor = hoverStyles.cursor || '';
        if (hoverStyles.position) {
          currentHoverElement.style.position = hoverStyles.position;
        }
        if (hoverStyles.zIndex !== undefined) {
          currentHoverElement.style.zIndex = hoverStyles.zIndex;
        }
        currentHoverElement = null;
      }
      if (editButton) {
        editButton.remove();
        editButton = null;
      }
    };

    const isFileEditable = (sourceFile: string): boolean => {
      return !NON_EDITABLE_FILES.some(pattern => pattern.test(sourceFile));
    };

    const isInsideNonEditableComponent = (element: HTMLElement): boolean => {
      // Check if element is inside a component that shouldn't be editable
      // by looking for data-source-file in parent chain that matches NON_EDITABLE_FILES
      let parent = element.parentElement;
      let depth = 0;
      while (parent && depth < 20) {
        if (parent.dataset.sourceFile && !isFileEditable(parent.dataset.sourceFile)) {
          return true;
        }
        parent = parent.parentElement;
        depth++;
      }
      return false;
    };
    const normalizeWhitespace = (text: string): string => {
      // Collapse multiple spaces/newlines into single spaces
      return text.trim().replace(/\s+/g, ' ');
    };

    const saveEdit = async (element: HTMLElement, sourceFile: string, sourceLine: string, sourceColumn?: string) => {
      const newContent = element.textContent || '';
      
      // Normalize both for comparison (handles multi-line text in source)
      const normalizedNew = normalizeWhitespace(newContent);
      const normalizedOriginal = normalizeWhitespace(originalContent);
      
      if (normalizedNew === normalizedOriginal) {
        exitEditMode();
        return;
      }

      console.log('💾 Saving edit...');
      console.log(`   Old: "${originalContent}"`);
      console.log(`   New: "${newContent}"`);

      try {
        const response = await fetch('/api/source-edit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: sourceFile,
            line: parseInt(sourceLine),
            column: sourceColumn ? parseInt(sourceColumn) : undefined,
            oldText: originalContent,
            newText: newContent,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('✅ File updated successfully');
          originalContent = newContent; // Update so we don't re-save
        } else {
          console.error('❌ Failed to update file:', result.error);
          if (result.debug) {
            console.log('🔍 Debug info:');
            result.debug.forEach((msg: string) => console.log('  ', msg));
          }
          // Revert the content
          element.textContent = originalContent;
        }
      } catch (error) {
        console.error('❌ Error saving edit:', error);
        // Revert the content
        element.textContent = originalContent;
      }

      exitEditMode();
    };

    const hasDirectTextContent = (element: HTMLElement): boolean => {
      // Check if element has text nodes as direct children (not just nested in other elements)
      for (const child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
          return true;
        }
      }
      return false;
    };

    const isTextElement = (el: HTMLElement): boolean => {
      const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'TD', 'TH', 'LABEL'];
      return textTags.includes(el.tagName) && hasDirectTextContent(el);
    };

    const findSourceElement = (target: HTMLElement): HTMLElement | null => {
      // PREFER INNERMOST: First check if the target itself or its children have source data
      // This ensures we select prop-tracked elements (from page.tsx) over component elements (from ServiceCard.tsx)
      
      // Helper to find deepest element with source data
      const findDeepestSourceChild = (element: HTMLElement): HTMLElement | null => {
        const children = Array.from(element.children) as HTMLElement[];
        for (const child of children) {
          // Recursively check children first (depth-first search)
          const deeperChild = findDeepestSourceChild(child);
          if (deeperChild) return deeperChild;
          
          // Check this child
          if (child.dataset.sourceFile && child.dataset.sourceLine) {
            if (isFileEditable(child.dataset.sourceFile) && !isInsideNonEditableComponent(child)) {
              return child;
            }
          }
        }
        return null;
      };
      
      // First, check if target has children with source data (prefer those)
      const deepChild = findDeepestSourceChild(target);
      if (deepChild) {
        return deepChild;
      }
      
      // Then check the clicked element itself
      if (target.dataset.sourceFile && target.dataset.sourceLine) {
        if (isFileEditable(target.dataset.sourceFile) && !isInsideNonEditableComponent(target)) {
          return target;
        }
      }
      
      // Now check if the clicked element itself or its close parent is a text element
      let clickedElement = target;
      for (let i = 0; i < 3; i++) {
        if (clickedElement && isTextElement(clickedElement)) {
          // Check if inside a non-editable component
          if (isInsideNonEditableComponent(clickedElement)) {
            return null;
          }
          
          // Found a text element, now find the nearest parent with source data
          // But prefer children over this parent
          let sourceParent = clickedElement.parentElement;
          let depth = 0;
          while (sourceParent && depth < 10) {
            if (sourceParent.dataset.sourceFile && sourceParent.dataset.sourceLine) {
              if (isFileEditable(sourceParent.dataset.sourceFile)) {
                // Before using this parent, check if clickedElement has children with source data
                const childWithSource = findDeepestSourceChild(clickedElement);
                if (childWithSource) {
                  return childWithSource;
                }
                
                // Copy source data to the text element
                clickedElement.dataset.sourceFile = sourceParent.dataset.sourceFile;
                clickedElement.dataset.sourceLine = sourceParent.dataset.sourceLine;
                if (sourceParent.dataset.sourceColumn) {
                  clickedElement.dataset.sourceColumn = sourceParent.dataset.sourceColumn;
                }
                return clickedElement;
              }
            }
            sourceParent = sourceParent.parentElement;
            depth++;
          }
        }
        clickedElement = clickedElement.parentElement as HTMLElement;
      }
      
      // Fallback to original behavior - find element with source data (walking up)
      let element = target;
      const maxDepth = 10;
      let depth = 0;
      
      while (element && depth < maxDepth) {
        const dataset = element.dataset;
        if (dataset.sourceFile && dataset.sourceLine) {
          if (isFileEditable(dataset.sourceFile)) {
            // Also check if inside a non-editable component
            if (isInsideNonEditableComponent(element)) {
              return null;
            }
            
            // Before returning this element, check if it has children with source data
            const childWithSource = findDeepestSourceChild(element);
            if (childWithSource) {
              return childWithSource;
            }
            
            return element;
          }
        }
        element = element.parentElement as HTMLElement;
        depth++;
      }
      
      console.log('❌ No source info found. Make sure the webpack loader is running.');
      return null;
    };

    const isImageElement = (element: HTMLElement): boolean => {
      // Check if element is an img tag or contains an img anywhere in its descendants
      return element.tagName === 'IMG' || element.querySelector('img') !== null;
    };

    const enterEditMode = (element: HTMLElement) => {
      const dataset = element.dataset;
      
      // Exit any existing edit mode
      exitEditMode();
      exitHoverMode();

      // Check if this is an image element
      if (isImageElement(element)) {
        const imgElement = element.tagName === 'IMG' ? element as HTMLImageElement : element.querySelector('img') as HTMLImageElement;
        const currentSrc = imgElement?.src || '';
        
        console.log('🖼️  Image edit mode - opening image selector');
        setImageDialogState({
          isOpen: true,
          element: element,
          currentSrc: currentSrc
        });
        return;
      }

      // Enter text edit mode
      currentEditElement = element;
      originalContent = element.textContent || '';
      originalStyles = {
        outline: element.style.outline,
        cursor: element.style.cursor,
        position: element.style.position,
      };

      element.contentEditable = 'true';
      element.style.outline = '2px solid #10b981';
      element.style.cursor = 'text';
      
      // Ensure element is positioned for proper editing
      const computedPosition = window.getComputedStyle(element).position;
      if (computedPosition === 'static') {
        element.style.position = 'relative';
      }
      
      element.focus();

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      console.log('✏️  Edit mode enabled');
      console.log('   Press Enter or click away to save');
      console.log('   Press Escape to cancel');

      // Handle save on blur
      const handleBlur = () => {
        if (currentEditElement) {
          saveEdit(element, dataset.sourceFile!, dataset.sourceLine!, dataset.sourceColumn);
        }
        element.removeEventListener('blur', handleBlur);
        element.removeEventListener('keydown', handleKeydown);
      };

      // Handle keyboard shortcuts
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          element.blur(); // This will trigger save via blur handler
        } else if (e.key === 'Escape') {
          e.preventDefault();
          element.textContent = originalContent;
          exitEditMode();
          element.removeEventListener('blur', handleBlur);
          element.removeEventListener('keydown', handleKeydown);
        }
      };

      element.addEventListener('blur', handleBlur);
      element.addEventListener('keydown', handleKeydown);
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Don't show hover when in edit mode
      if (currentEditElement) {
        return;
      }

      const target = event.target as HTMLElement;
      
      // Don't exit hover mode if hovering over the edit button
      if (target.dataset?.editButton === 'true') {
        return;
      }

      // Use findSourceElement which now prefers innermost elements
      const element = findSourceElement(target);
      
      // Never select certain container elements
      if (element && NON_SELECTABLE_TAGS.includes(element.tagName)) {
        if (currentHoverElement) {
          exitHoverMode();
        }
        return;
      }
      
      // Check if inside a non-editable component
      if (element && isInsideNonEditableComponent(element)) {
        if (currentHoverElement) {
          exitHoverMode();
        }
        return;
      }
      
      if (element && element !== currentHoverElement) {
        // Exit previous hover
        exitHoverMode();
        
        // Enter new hover
        currentHoverElement = element;
        hoverStyles = {
          outline: element.style.outline,
          cursor: element.style.cursor,
          position: element.style.position,
          zIndex: element.style.zIndex,
        };
        
        // Debug logging
        if(debug_mode === 'true') { 
          console.log('🎯 Hovering over editable element:');
          console.log(`   Tag: <${element.tagName.toLowerCase()}>`);
          console.log(`   Text: "${element.textContent?.trim().substring(0, 50)}${element.textContent && element.textContent.length > 50 ? '...' : ''}"`);
          console.log(`   Source: ${element.dataset.sourceFile}:${element.dataset.sourceLine}`);
          console.log(`   Is Image: ${isImageElement(element)}`);  
        }
        
        element.style.outline = '2px dashed #3b82f6';
        element.style.cursor = 'pointer';
        
        // Make element positioned if it's not already
        const computedPosition = window.getComputedStyle(element).position;
        if (computedPosition === 'static') {
          element.style.position = 'relative';
        }
        
        // Ensure the element allows the button to be on top
        if (!element.style.zIndex || parseInt(element.style.zIndex) < 1) {
          element.style.zIndex = '1';
        }
        
        // Add edit button
        editButton = createEditButton(element);
        editButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          enterEditMode(element);
        };
        document.body.appendChild(editButton);
      } else if (!element && currentHoverElement && target.dataset?.editButton !== 'true') {
        exitHoverMode();
      }
    };

    const handleDoubleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const element = findSourceElement(event.target as HTMLElement);
      
      // Never edit certain container elements
      if (element && NON_SELECTABLE_TAGS.includes(element.tagName)) {
        return;
      }
      
      // Never edit elements inside non-editable components
      if (element && isInsideNonEditableComponent(element)) {
        return;
      }
      
      if (element) {
        enterEditMode(element);
      }
    };

    const handleScroll = () => {
      // Exit hover mode when scrolling to prevent pencil from being misaligned
      if (currentHoverElement) {
        exitHoverMode();
      }
    };

    // Add listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('dblclick', handleDoubleClick, true);
    document.addEventListener('scroll', handleScroll, true); // true for capture phase to catch all scrolls

    console.log('✏️  Click-to-Edit enabled: Hover to highlight, Double-click or click Edit button to edit text or images');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('dblclick', handleDoubleClick, true);
      document.removeEventListener('scroll', handleScroll, true);
      exitEditMode();
      exitHoverMode();
    };
  }, [setImageDialogState]);

  const handleImageSelect = async (newImageUrl: string) => {
    if (!imageDialogState.element) return;

    const element = imageDialogState.element;
    const dataset = element.dataset;
    const imgElement = element.tagName === 'IMG' ? element as HTMLImageElement : element.querySelector('img') as HTMLImageElement;
    
    if (!imgElement) return;
    
    console.log('🖼️  Updating image...');
    console.log(`   New: "${newImageUrl}"`);

    try {
      const response = await fetch('/api/source-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: dataset.sourceFile,
          line: parseInt(dataset.sourceLine!),
          column: dataset.sourceColumn ? parseInt(dataset.sourceColumn) : undefined,
          newText: newImageUrl,
          isImageSrcReplacement: true, // Flag to indicate this is an image src replacement
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Image updated successfully');
        imgElement.src = newImageUrl; // Update preview
      } else {
        console.error('❌ Failed to update image:', result.error);
        if (result.debug) {
          console.log('🔍 Debug info:');
          result.debug.forEach((msg: string) => console.log('  ', msg));
        }
      }
    } catch (error) {
      console.error('❌ Error updating image:', error);
    }

    setImageDialogState({ isOpen: false, element: null, currentSrc: '' });
  };

  return (
    <ImageEditDialog
      isOpen={imageDialogState.isOpen}
      currentSrc={imageDialogState.currentSrc}
      onClose={() => setImageDialogState({ isOpen: false, element: null, currentSrc: '' })}
      onSelect={handleImageSelect}
    />
  );
}
