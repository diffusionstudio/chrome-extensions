import { queries } from "./queries";
import { matchUrl, loadTab } from "./utils";

chrome.runtime.onMessage.addListener(async function (message) {
  if (message?.type != "QUERY_TEXT" || !message.url || typeof message.url != 'string') return;

  const match = matchUrl(message.url);

  let tab = await chrome.tabs.create({
    url: message.url,
    active: false,
  });

  // Important! Wait for tab to be loaded
  await loadTab(tab.id)

  const res = await chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: queries[match],
  });

  // remove tab when successful
  if (res[0].result) {
    chrome.tabs.remove(tab.id!);
  }

  [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  await chrome.tabs.sendMessage(tab.id!, { type: 'QUERY_TEXT_RESPONSE', content: res[0].result });
});
