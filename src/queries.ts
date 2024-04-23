import { UrlMatch } from "./utils";

export const queries: Record<UrlMatch, () => string> = {
  'REDDIT': () => {
    const title = document
      .querySelector('shreddit-post')
      ?.querySelector('div[slot="title"]') // @ts-ignore
      ?.innerText?.trim();

    const text = document
      .querySelector('shreddit-post')
      ?.querySelector('div[slot="text-body"]') // @ts-ignore
      ?.innerText?.trim();

    const content = [title, text]
      .filter((res) => res != undefined)
      .join('\n\n')
      .replace(/ {1,}$/gm, '')
      .replace(/read more$/gi, '')
      .trim();
    return content;
  },
  'QUORA': () => {
    const title = document
      .querySelector('div.q-text.qu-dynamicFontSize--xlarge') // @ts-ignore
      ?.innerText
      ?.trim();
    const text = document
      .querySelector('div.q-text:not([class*=" "]) > span') // @ts-ignore
      ?.innerText
      ?.trim();

    const content = [title, text]
      .filter((res) => res != undefined)
      .join('\n\n')
      .trim();
    return content;
  },
  'UNKNOWN': function () {
    return ''
  }
}
