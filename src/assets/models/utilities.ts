import {Platform} from "ionic-angular";

const platform = new Platform();

export function resolveURL(url: string) {
    if (platform.is('android')) {
      return url.replace('www/', '');
    }
    return url;
}
