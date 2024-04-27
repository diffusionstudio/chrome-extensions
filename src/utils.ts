export type UrlMatch = 'QUORA' | 'REDDIT' | 'UNKNOWN';
/**
 * Generic http url regex
 */
export const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim;
/**
 * Quora url regex
 */
export const quoraRegex = /^https:\/\/(((?:www\.|(?!www))quora\.com)|((?:www\.|(?!www))qr\.ae))/gim;
/**
 * Reddit url regex
 */
export const redditRegex = /^https:\/\/(((?:www\.|(?!www))reddit\.com))/gim;

/**
 * Match string with known url patterns
 */
export function matchUrl(text: string): UrlMatch {
  // compare with supported urls
  if (text.match(quoraRegex)) {
    return 'QUORA';
  }
  if (text.match(redditRegex)) {
    return 'REDDIT';
  }
  return 'UNKNOWN';
};
