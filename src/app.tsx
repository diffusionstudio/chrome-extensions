import { useEffect, useState } from 'react';

// function redditQuery() {
//   const title = document
//     .querySelector('shreddit-post')
//     ?.querySelector('div[slot="title"]') // @ts-ignore
//     ?.innerText?.trim();
//   // @ts-ignore
//   const text = document
//     .querySelector('shreddit-post')
//     ?.querySelector('div[slot="text-body"]') // @ts-ignore
//     ?.innerText?.trim();
// 
//   const content = [title, text]
//     .filter((res) => res != undefined)
//     .join('\n\n')
//     .replace(/ {1,}$/gm, '')
//     .replace(/read more$/gi, '')
//     .trim();
// 
//   return content;
// }

function App() {
  const [text, setText] = useState('Diffusion Studio');
  // const onClick = async () => {
  //   let tab = await chrome.tabs.create({
  //     url: 'hello',
  //     active: false,
  //   });
  //
  //   const res = await chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: redditQuery,
  //   });
  //
  //   chrome.tabs.remove(tab.id!);
  //
  //   tab = (await chrome.tabs.query({ url: import.meta.env.APP_HOST }))?.[0];
  //
  //   console.log('apptabid', tab.id);
  //
  //   await chrome.tabs.sendMessage(tab.id!, {
  //     content: res[0].result,
  //   });
  // };

  useEffect(() => {
    chrome.runtime.onMessageExternal.addListener((msg) => setText(JSON.stringify(msg)));
  }, []);

  return (
    <div className="h-96 w-72 flex items-center justify-center bg-background">
      <p>{text}</p>
    </div>
  );
}

export default App;
