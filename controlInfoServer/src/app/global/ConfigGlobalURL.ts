import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigGlobalUrl {
  private apiUrl: string = 'http://127.0.0.1:5000/';

  constructor() {}

  getApiUrl(): string {
    return this.apiUrl;
  }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }
}
