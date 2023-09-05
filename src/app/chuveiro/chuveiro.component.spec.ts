import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuveiroFileComponent } from './chuveiro.component';

describe('ChuveiroFileComponent', () => {
  let component: ChuveiroFileComponent;
  let fixture: ComponentFixture<ChuveiroFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuveiroFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuveiroFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
