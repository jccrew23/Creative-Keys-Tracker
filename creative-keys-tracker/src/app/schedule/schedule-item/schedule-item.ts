import { Component, Input } from '@angular/core';
import { Appointment } from '../schedule.model';
import { ScheduleService } from '../schedule.service';
import { StudentService } from '../../students/student.service';
import { Student } from '../../students/student.model';

@Component({
  selector: 'app-schedule-item',
  standalone: false,
  templateUrl: './schedule-item.html',
  styleUrls: ['./schedule-item.css']
})
export class ScheduleItem {
  @Input() appointments: Appointment[] = [];
  @Input() day!: string;

  constructor(
    private scheduleService: ScheduleService,
    private studentService: StudentService
  ) {}

  removeAppointment(appointmentId: string): void {
    this.scheduleService.removeAppointment(appointmentId);
  }

  getStudentName(studentId: string): string {
    const student = this.studentService.getStudentWithId(studentId);
    return student ? student.firstName : 'Unknown Student';
  }

  formatTime(time24: string): string {
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // convert to 12-hour format
  return `${hour}:${minute} ${ampm}`;
}

}
