import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-item',
  standalone: false,
  templateUrl: './student-item.html',
  styleUrls: ['./student-item.css']
})
export class StudentItem {
  @Input() student!: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }


}
