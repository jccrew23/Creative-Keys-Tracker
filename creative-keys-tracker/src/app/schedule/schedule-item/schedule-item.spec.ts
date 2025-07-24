import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleItem } from './schedule-item';

describe('ScheduleItem', () => {
  let component: ScheduleItem;
  let fixture: ComponentFixture<ScheduleItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
