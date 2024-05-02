const queries = {
  "REDDIT": () => {
    var _a, _b, _c, _d, _e, _f;
    const title = (_c = (_b = (_a = document.querySelector("shreddit-post")) == null ? void 0 : _a.querySelector('div[slot="title"]')) == null ? void 0 : _b.innerText) == null ? void 0 : _c.trim();
    const text = (_f = (_e = (_d = document.querySelector("shreddit-post")) == null ? void 0 : _d.querySelector('div[slot="text-body"]')) == null ? void 0 : _e.innerText) == null ? void 0 : _f.trim();
    const content = [title, text].filter((res) => res != void 0).join("\n\n").replace(/ {1,}$/gm, "").replace(/read more$/gi, "").trim();
    return content;
  },
  "QUORA": () => {
    var _a, _b, _c, _d;
    const title = (_b = (_a = document.querySelector("div.q-text.qu-dynamicFontSize--xlarge")) == null ? void 0 : _a.innerText) == null ? void 0 : _b.trim();
    const text = (_d = (_c = document.querySelector('div.q-text:not([class*=" "]) > span')) == null ? void 0 : _c.innerText) == null ? void 0 : _d.trim();
    const content = [title, text].filter((res) => res != void 0).join("\n\n").trim();
    return content;
  },
  "UNKNOWN": function() {
    return document.body.innerText;
  }
};
const quoraRegex = /^https:\/\/(((?:www\.|(?!www))quora\.com)|((?:www\.|(?!www))qr\.ae))/gim;
const redditRegex = /^https:\/\/(((?:www\.|(?!www))reddit\.com))/gim;
function matchUrl(text) {
  if (text.match(quoraRegex)) {
    return "QUORA";
  }
  if (text.match(redditRegex)) {
    return "REDDIT";
  }
  return "UNKNOWN";
}
async function loadTab(id) {
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(async function updateHandler(tabId, info) {
      if (info.status !== "complete" || tabId != id)
        return;
      chrome.tabs.onUpdated.removeListener(updateHandler);
      resolve(void 0);
    });
  });
}
async function handleQueryText(port, message) {
  if (!message.url || typeof message.url != "string")
    return;
  const match = matchUrl(message.url);
  let tab = await chrome.tabs.create({
    url: message.url,
    active: false
  });
  await loadTab(tab.id);
  const res = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: queries[match]
  });
  if (res[0].result) {
    chrome.tabs.remove(tab.id);
  }
  port.postMessage({ type: "QUERY_TEXT_RESPONSE", content: res[0].result });
}
async function handlePing(port, _) {
  port.postMessage({ type: "PONG" });
}
function handlePortMessage(port) {
  return async (message) => {
    switch (message == null ? void 0 : message.type) {
      case "QUERY_TEXT":
        handleQueryText(port, message);
        break;
      case "PING":
        handlePing(port);
        break;
    }
  };
}
function runtimeListener(port) {
  port.onMessage.addListener(handlePortMessage(port));
}
chrome.runtime.onConnect.addListener(runtimeListener);
