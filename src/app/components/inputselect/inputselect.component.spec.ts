import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputselectComponent } from './inputselect.component';

describe('InputselectComponent', () => {
  let component: InputselectComponent;
  let fixture: ComponentFixture<InputselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputselectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
