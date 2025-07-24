import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']

})
export class StudentList implements OnInit {
  students: Student[] = [];
  term: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
     this.studentService.studentListChangedEvent.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );

   this.studentService.getStudents();
  }

  search(term: string): void {
    this.term = term;
  }
}
