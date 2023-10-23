import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPizzaComponent } from './graphic-pizza.component';

describe('GraphicPizzaComponent', () => {
  let component: GraphicPizzaComponent;
  let fixture: ComponentFixture<GraphicPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicPizzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
