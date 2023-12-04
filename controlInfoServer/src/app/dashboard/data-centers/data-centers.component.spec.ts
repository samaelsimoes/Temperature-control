import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCentersComponent } from './data-centers.component';

describe('DataCentersComponent', () => {
  let component: DataCentersComponent;
  let fixture: ComponentFixture<DataCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCentersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
