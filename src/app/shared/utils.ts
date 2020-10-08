/**
 * Utils class
 */
import { HttpParams } from '@angular/common/http';

export default class Utils {

  public static setHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach((key) => {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }

  public static deleteNullKey(obj: any): any {
    Object.keys(obj).forEach((key) => {
      if (obj[key] == null) delete obj[key];
    });
    return { ...obj };
  }

  public static makeRandom(lengthOfCode: number): string {
    let text = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;[]\=-)(*&^%$#@!~`";

    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public static hasDuplicates(arr: any[]): boolean {
    let counts = [];

    for (let i = 0; i < arr.length; i++) {
        if (counts[arr[i]] === undefined) {
            counts[arr[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

}
