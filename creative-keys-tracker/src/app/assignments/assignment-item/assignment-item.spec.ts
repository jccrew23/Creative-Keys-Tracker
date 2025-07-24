import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentItem } from './assignment-item';

describe('AssignmentItem', () => {
  let component: AssignmentItem;
  let fixture: ComponentFixture<AssignmentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
