import { pirateDict } from './pirateDictionary';

const pirateExclamations = [
  "Arrr!", "Yo-ho-ho!", "Shiver me timbers!", "Blimey!", "Ahoy!", "Ye scallywag!", "Avast!"
];

const pirateEmojis = ["🏴‍☠️", "⚓", "🍹", "💀", "🦜", "🪙", "🦈"];

export function pirateify(text: string): string {
  let pirateText = text.toLowerCase();

  for (const [normal, pirate] of Object.entries(pirateDict)) {
    const pattern = new RegExp(`\\b${normal}\\b`, 'gi');
    pirateText = pirateText.replace(pattern, pirate);
  }

  // Add a random pirate exclamation and emoji to the end
  const randomExclamation = pirateExclamations[Math.floor(Math.random() * pirateExclamations.length)];
  const randomEmoji = pirateEmojis[Math.floor(Math.random() * pirateEmojis.length)];

  return `${pirateText.charAt(0).toUpperCase()}${pirateText.slice(1)} ${randomExclamation} ${randomEmoji}`;
}