import { browser } from '@wdio/globals'

export class Page {
  open(url: string) {
    return browser.url(url)
  }
}