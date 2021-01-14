import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeQuestionsComponent } from './propose-questions.component';

describe('ProposeQuestionsComponent', () => {
  let component: ProposeQuestionsComponent;
  let fixture: ComponentFixture<ProposeQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
