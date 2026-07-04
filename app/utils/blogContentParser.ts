/**
 * Converts blog post markdown-style content to semantic HTML for SEO
 */
export function parseMarkdownToHTML(content: string): string {
  const lines = content.split('\n');
  const htmlLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      htmlLines.push('<ul class="list-disc ml-6 mb-4 space-y-2">');
      listItems.forEach(item => {
        htmlLines.push(`<li class="text-slate-200">${item}</li>`);
      });
      htmlLines.push('</ul>');
      listItems = [];
      inList = false;
    }
  };

  const flushBlockquote = () => {
    if (inBlockquote && blockquoteLines.length > 0) {
      htmlLines.push('<div class="my-6 p-4 bg-amber-500/10 border-l-4 border-amber-400 rounded-r">');
      blockquoteLines.forEach(line => {
        htmlLines.push(`<p class="text-slate-200 mb-2 last:mb-0">${formatInlineMarkdown(line)}</p>`);
      });
      htmlLines.push('</div>');
      blockquoteLines = [];
      inBlockquote = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableLines.length > 0) {
      htmlLines.push('<div class="overflow-x-auto my-6"><table class="w-full border-collapse bg-slate-800/50 rounded-lg overflow-hidden">');
      tableLines.forEach((line, index) => {
        const cells = line.split('|').filter(cell => cell.trim());
        if (index === 0) {
          htmlLines.push('<thead class="bg-blue-900/50"><tr>');
          cells.forEach(cell => {
            htmlLines.push(`<th class="border border-slate-700 px-4 py-3 text-left text-white font-semibold">${formatInlineMarkdown(cell.trim())}</th>`);
          });
          htmlLines.push('</tr></thead><tbody>');
        } else if (!line.includes('---')) {
          htmlLines.push('<tr class="hover:bg-slate-700/30">');
          cells.forEach(cell => {
            htmlLines.push(`<td class="border border-slate-700 px-4 py-3 text-slate-200">${formatInlineMarkdown(cell.trim())}</td>`);
          });
          htmlLines.push('</tr>');
        }
      });
      htmlLines.push('</tbody></table></div>');
      tableLines = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    // Horizontal rule
    if (line.trim() === '---') {
      flushList();
      flushBlockquote();
      flushTable();
      htmlLines.push('<hr class="my-8 border-t-2 border-slate-700"/>');
      continue;
    }

    // Skip empty lines at boundaries
    if (line.trim() === '') {
      flushList();
      flushBlockquote();
      flushTable();
      htmlLines.push('<br/>');
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      flushTable();
      inBlockquote = true;
      blockquoteLines.push(line.slice(2).trim());
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      flushBlockquote();
      inTable = true;
      tableLines.push(line.trim());
      continue;
    } else if (inTable && !line.trim().startsWith('|')) {
      flushTable();
    }

    // H1 headers
    if (line.startsWith('# ')) {
      flushList();
      const text = line.slice(2).trim();
      htmlLines.push(`<h1 class="text-3xl font-bold text-white mt-8 mb-4">${formatInlineMarkdown(text)}</h1>`);
      continue;
    }

    // H2 headers
    if (line.startsWith('## ')) {
      flushList();
      const text = line.slice(3).trim();
      htmlLines.push(`<h2 class="text-2xl font-bold text-white mt-8 mb-4">${formatInlineMarkdown(text)}</h2>`);
      continue;
    }

    // H3 headers
    if (line.startsWith('### ')) {
      flushList();
      const text = line.slice(4).trim();
      htmlLines.push(`<h3 class="text-xl font-bold text-amber-400 mt-6 mb-3">${formatInlineMarkdown(text)}</h3>`);
      continue;
    }

    // List items
    if (line.match(/^[\-\*]\s+/)) {
      const text = line.replace(/^[\-\*]\s+/, '').trim();
      inList = true;
      listItems.push(formatInlineMarkdown(text));
      continue;
    }

    // Numbered list items
    if (line.match(/^\d+\.\s+/)) {
      flushList();
      const text = line.replace(/^\d+\.\s+/, '').trim();
      htmlLines.push(`<p class="mb-2 ml-4"><strong class="text-amber-400">${formatInlineMarkdown(text)}</strong></p>`);
      continue;
    }

    // Regular paragraphs
    flushList();
    const formatted = formatInlineMarkdown(line.trim());
    if (formatted) {
      htmlLines.push(`<p class="mb-4 text-slate-200">${formatted}</p>`);
    }
  }

  flushList();
  flushBlockquote();
  flushTable();
  return htmlLines.join('');
}

/**
 * Format inline markdown (bold, italic, links)
 */
function formatInlineMarkdown(text: string): string {
  // Bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  // Italic text
  text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Links
  text = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-amber-400 hover:text-amber-300 underline transition-colors">$1</a>'
  );

  // Code inline
  text = text.replace(/`(.*?)`/g, '<code class="bg-slate-700 px-2 py-1 rounded text-amber-300">$1</code>');

  return text;
}
