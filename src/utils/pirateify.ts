import pirateDict from './pirateDictionary';

function preserveCapitalization(original: string, replacement: string): string {
  if (original[0] === original[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function chooseRandom(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)];
  }
  return value;
}

export function pirateify(text: string): string {
  let result = text;

  // Handle phrase replacements first (longest first)
  const phrases = Object.keys(pirateDict).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      const pirateWord = pirateDict[phrase];
      return preserveCapitalization(match, chooseRandom(pirateWord));
    });
  }

  return result;
}