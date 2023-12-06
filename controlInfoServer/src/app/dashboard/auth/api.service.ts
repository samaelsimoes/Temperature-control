import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ConfigGlobalUrl } from 'app/global/ConfigGlobalURL';

@Injectable({
    providedIn: 'root'
})
export class ServiceDashBoard {
    link: string;

    constructor(
        private http: HttpClient,
        private url: ConfigGlobalUrl
    ) {
        this.link = this.url.getApiUrl();
    }

    getApis(param: string) {
        return this.http.get<any>(`${this.link}/consumo_chuveiro`);
    }
}
