import { Component, OnInit, EventEmitter, Output } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Servidor ', icon: 'cloud', class: '' },
  { path: '/chuveiro', title: 'Chuveiro', icon: 'shower', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() linkClicado: EventEmitter<string> = new EventEmitter<string>();
  menuItems!: any[];

  constructor() {
    this.menuItems = [];
   }

  ngOnInit() {
    this.menuItems = [];
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  handleLinkClick(path: string) {
    this.linkClicado.emit(path);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
