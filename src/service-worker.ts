import { queries } from "./queries";
import { matchUrl } from "./utils";

chrome.runtime.onMessage.addListener(async function (request) {
  if (request?.type != "QUERY_TEXT" || !request.url || typeof request.url != 'string') return;

  const match = matchUrl(request.url);

  let tab = await chrome.tabs.create({
    url: request.url,
    active: false,
  });

  chrome.tabs.onUpdated.addListener(async function updateHandler(tabId, info) {
    if (info.status !== 'complete' || tabId != tab.id) return;

    chrome.tabs.onUpdated.removeListener(updateHandler);

    const res = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: queries[match],
    });

    if (res[0].result) {
      chrome.tabs.remove(tab.id!);
    }

    tab = (await chrome.tabs.query({ url: import.meta.env.VITE_APP_TAB_URL }))?.[0];

    await chrome.tabs.sendMessage(tab.id!, { type: 'QUERY_TEXT_RESPONSE', content: res[0].result });
  });
});
