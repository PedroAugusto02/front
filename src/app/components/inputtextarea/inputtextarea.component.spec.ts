import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputtextareaComponent } from './inputtextarea.component';

describe('InputtextareaComponent', () => {
  let component: InputtextareaComponent;
  let fixture: ComponentFixture<InputtextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputtextareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputtextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
