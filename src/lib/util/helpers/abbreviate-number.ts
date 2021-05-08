const defaultsuffixes = [ "", "k", "M", "G", "T", "P", "E" ];

/**
 * Abbreviate number with appropriate suffix.
 */
export function abbreviateNumber(number: number, suffixes: string[] = defaultsuffixes) {
  const digits = Math.log10(Math.abs(number));
  const tier = Math.trunc(digits / 3);
  
  if (tier === 0) {
    return number.toString();
  }
  
  const scale = 10 ** (tier * 3);
  const scaledNumber = number / scale;
  
  return `${scaledNumber.toFixed(1)}${suffixes[tier]}`;
}