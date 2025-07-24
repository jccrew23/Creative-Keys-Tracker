import { Component } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {
  selectedStudent!: Student;
  students: Student[] = [];

  private subscription!: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.subscription = this.studentService.studentSelectedEvent.subscribe(
      (student: Student) => {
        this.selectedStudent = student;
      }
    );
  }
   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
