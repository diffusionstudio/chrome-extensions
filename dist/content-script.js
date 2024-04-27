sessionStorage.setItem("ds.plugin.installed", "true");
chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if (!sender.tab) {
      window.postMessage(request, "*");
    }
  }
);
async function handleMessage(event) {
  if (event.source != window)
    return;
  if (event.data.type) {
    await chrome.runtime.sendMessage(event.data);
  }
}
window.addEventListener("message", handleMessage);
