import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigGlobalUrl {
  private apiUrl: string = 'URL';

  constructor() {}

  getApiUrl(): string {
    return this.apiUrl;
  }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }
}
