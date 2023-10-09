import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuveiroComponent } from './chuveiro.component';

describe('ChuveiroComponent', () => {
  let component: ChuveiroComponent;
  let fixture: ComponentFixture<ChuveiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuveiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChuveiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
