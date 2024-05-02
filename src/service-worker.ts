import { queries } from "./queries";
import { matchUrl, loadTab } from "./utils";

async function handleQueryText(port: chrome.runtime.Port, message: any) {
  if (!message.url || typeof message.url != 'string') return;

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

  port.postMessage({ type: 'QUERY_TEXT_RESPONSE', content: res[0].result });
}

async function handlePing(port: chrome.runtime.Port, _: any) {
  port.postMessage({ type: 'PONG' });
}

function handlePortMessage(port: chrome.runtime.Port) {
  return async (message: any) => {
    switch (message?.type) {
      case 'QUERY_TEXT':
        handleQueryText(port, message);
        break;
      case 'PING':
        handlePing(port, message);
        break;
      default:
        break;
    }
  }
}

function runtimeListener(port: chrome.runtime.Port) {
  // Listen for messages from the content scripts
  port.onMessage.addListener(handlePortMessage(port));
}

// Set up a long-lived connection with the content scripts
chrome.runtime.onConnect.addListener(runtimeListener);
