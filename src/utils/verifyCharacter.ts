export function isAlphabetic(text: string) {
  return /^[a-zA-Z]$/.test(text);
}

export function isNumeric(text: string) {
  return isNaN(Number(text));
}