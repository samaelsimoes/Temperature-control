import { Component, Input, OnInit } from '@angular/core';
import { DataCenterInfoInterface } from '../interface/dataCenterInfoInterface';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() dataCenterInfo: any;

  test: Date = new Date();
  paramDataCenter!: any;

  constructor( ) { }

  ngOnInit() {
    this.paramDataCenter = this.dataCenterInfo;
  }
}
