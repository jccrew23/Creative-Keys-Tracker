import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../students/student.service';
import { Student } from '../../students/student.model';
import { ScheduleService } from '../schedule.service';
import { Appointment } from '../schedule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Params } from '@angular/router';

@Component({
  selector: 'app-schedule-edit',
  standalone: false,
  templateUrl: './schedule-edit.html',
  styleUrls: ['./schedule-edit.css']
})
export class ScheduleEdit implements OnInit {
  students: Student[] = [];
  selectedStudentId: string= '';
  selectedDay: string = '';
  selectedTime: string = '';
  Appointment: Appointment = {
    id: '',
    studentId: '',
    day: '',
    time: ''
  };


  constructor(
    private studentService: StudentService,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === null || id === undefined) {
        return;
      }
      const appointment = this.scheduleService.getAppointmentById(id);
      if (!appointment) {
        return;
      }
      this.Appointment = JSON.parse(JSON.stringify(appointment)); // Deep copy to avoid reference issues
      this.selectedStudentId = this.Appointment.studentId;
      this.students = this.studentService.getStudents();
      });
  }

   onSubmit(form: NgForm) {
    const value = form.value;
    const newAppointment: Appointment = {
      id: value.id,
      studentId: value.studentId,
      day: value.day,
      time: value.time

    };


      this.scheduleService.addAppointment(newAppointment);


    this.router.navigate(['/schedule']);
  }

  // Method to handle form cancellation
  onCancel() {
    this.router.navigate(['/schedule']);
  }


}
