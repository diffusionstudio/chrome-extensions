/**
 * Propagate window events to service worker if they contain a type
 */
async function handleMessage(event: MessageEvent<{ type: string }>) {
  // We only accept messages from ourselves
  if (event.source != window || !event.data.type) return;

  /**
   * Establish connection with background script
   */
  const port = chrome.runtime.connect({ name: 'content-script' });

  /**
   * Post message to service worker
   */
  port.postMessage(event.data);

  /**
   * propagate service worker responses to window and close port
   */
  port.onMessage.addListener(function (message) {
    window.postMessage(message, '*');
    port.disconnect();
  });
}

window.addEventListener("message", handleMessage);
