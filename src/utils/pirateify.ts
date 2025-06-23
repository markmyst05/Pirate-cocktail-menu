import pirateDict from './pirateDictionary';

function preserveCapitalization(original: string, replacement: string): string {
  if (original[0] === original[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function pirateify(text: string): string {
  const phrases = Object.keys(pirateDict)
    .filter(key => key.includes(' '))
    .sort((a, b) => b.length - a.length); // longest phrases first

  let result = text;

  // Step 1: Replace phrases
  for (const phrase of phrases) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    result = result.replace(regex, match =>
      preserveCapitalization(match, pirateDict[phrase])
    );
  }

  // Step 2: Replace single words (excluding phrases)
  const wordsOnly = Object.keys(pirateDict).filter(key => !key.includes(' '));
  const wordRegex = new RegExp(`\\b(${wordsOnly.join('|')})\\b`, 'gi');

  result = result.replace(wordRegex, match =>
    preserveCapitalization(match, pirateDict[match.toLowerCase()])
  );

  return result;
}
import pirateDict from './pirateDictionary';

export function pirateify(text: string): string {
  if (!text) return '';
  
  let result = text.toLowerCase();
  
  // Replace words using the pirate dictionary
  Object.entries(pirateDict).forEach(([normal, pirate]) => {
    const regex = new RegExp(`\\b${normal}\\b`, 'gi');
    result = result.replace(regex, pirate);
  });
  
  // Add some pirate flair
  result = result.replace(/\band\b/gi, "n'");
  result = result.replace(/\bof\b/gi, "o'");
  result = result.replace(/\bto\b/gi, "t'");
  
  return result;
}
