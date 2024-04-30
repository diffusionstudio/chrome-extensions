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

/**
 * Wait until the specified tab has stopped loading
 */
export async function loadTab(id?: number): Promise<void> {
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(async function updateHandler(tabId, info) {
      if (info.status !== 'complete' || tabId != id) return;

      // and don't forget to unregister
      chrome.tabs.onUpdated.removeListener(updateHandler);

      resolve(undefined);
    });
  })
}
