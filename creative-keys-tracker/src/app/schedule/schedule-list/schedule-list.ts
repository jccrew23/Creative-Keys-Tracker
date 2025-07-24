import { Component, OnInit } from '@angular/core';
import { Appointment } from '../schedule.model';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule-list',
  standalone: false,
  templateUrl: './schedule-list.html',
  styleUrls: ['./schedule-list.css']
})
export class ScheduleList implements OnInit {
  appointments: Appointment[] = [];
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
  }

  getAppointmentsForDay(day: string): Appointment[] {
    return this.appointments.filter(appt => appt.day === day);
  }

  onDeleteAppointment(appointmentId: string) {
    this.scheduleService.removeAppointment(appointmentId);
  }
}
