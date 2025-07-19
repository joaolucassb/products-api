export function firstMissingLetter(name: string): string {
  const letters = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('');

  for (let charCode = 97; charCode <= 122; charCode++) {
    const letter = String.fromCharCode(charCode);
    if (!letters.includes(letter)) return letter;
  }

  return '_';
}
