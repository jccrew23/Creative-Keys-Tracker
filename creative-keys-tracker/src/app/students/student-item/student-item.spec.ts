import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentItem } from './student-item';

describe('StudentItem', () => {
  let component: StudentItem;
  let fixture: ComponentFixture<StudentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
