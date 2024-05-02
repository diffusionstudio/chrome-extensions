async function handleMessage(event) {
  if (event.source != window || !event.data.type)
    return;
  const port = chrome.runtime.connect({ name: "content-script" });
  port.postMessage(event.data);
  port.onMessage.addListener(function(message) {
    window.postMessage(message, "*");
    port.disconnect();
  });
}
window.addEventListener("message", handleMessage);
