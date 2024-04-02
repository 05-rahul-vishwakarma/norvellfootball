import { isNativeApp } from "webtonative";
import { get, set } from "webtonative/Clipboard";

export async function Copy(text) {
  try {
    let isCopied = false;

    if (isNativeApp) {
      set({
        data: `${text}`,
      });
      get({
        callback: (data) => {
          isCopied = data?.value === text;
        },
      });
    } else {
      await navigator.clipboard.writeText(text);
      isCopied = (await navigator?.clipboard?.readText()) === text;
    }
    return isCopied;
  } catch (error) {
    return false;
  }
}
