import { useEffect } from 'react';

function App() {
  useEffect(() => {
    (async () => {
      /**
       * Manually inject content script
       */
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ['content-script.js'],
      });
    })();
  }, []);

  return (
    <div className="h-40 w-72 flex items-center justify-center bg-background">
      <p className="font-medium">Extension enabled</p>
    </div>
  );
}

export default App;
