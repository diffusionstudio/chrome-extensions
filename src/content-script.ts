/**
 * Let apps know that the extension is installed
 */
sessionStorage.setItem('ds.plugin.installed', 'true')

/**
 * Propagate chrome extension events to window
 */
chrome.runtime.onMessage.addListener(
  function (request, sender) {
    if (!sender.tab) {
      window.postMessage(request, '*')
    }
  }
);

/**
 * Propagate window events to chrome exension if
 * they contain a type
 */
async function handleMessage(event: MessageEvent<{ type: string }>) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  if (event.data.type) {
    await chrome.runtime.sendMessage(event.data);
  }
}

window.addEventListener("message", handleMessage);
