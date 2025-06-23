import { pirateDict } from './pirateDictionary';

function preserveCapitalization(original: string, replacement: string): string {
  if (original[0] === original[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function pirateify(text: string): string {
  if (!text) return '';

  return text
    .split(/\b/)
    .map(chunk => {
      const trimmed = chunk.trim();
      if (!trimmed) return chunk;

      // Extract punctuation
      const match = chunk.match(/^(\W*)(\w+)(\W*)$/);
      if (!match) return chunk;

      const [, leadingPunct = '', coreWord = '', trailingPunct = ''] = match;

      const lower = coreWord.toLowerCase();
      const translated = pirateDict[lower];

      if (translated) {
        const preserved = preserveCapitalization(coreWord, translated);
        return `${leadingPunct}${preserved}${trailingPunct}`;
      }

      return chunk;
    })
    .join('');
}