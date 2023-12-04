import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSuccessComponent } from './graphic-success.component';

describe('GraphicSuccessComponent', () => {
  let component: GraphicSuccessComponent;
  let fixture: ComponentFixture<GraphicSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
