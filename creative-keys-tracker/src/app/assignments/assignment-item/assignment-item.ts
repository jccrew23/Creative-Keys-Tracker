import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { Student } from '../../students/student.model';
import { AssignmentService } from '../assignment.service';
import { StudentService } from '../../students/student.service';


@Component({
  selector: 'app-assignment-item',
  standalone: false,
  templateUrl: './assignment-item.html',
  styleUrls: ['./assignment-item.css']
})
export class AssignmentItem implements OnInit {
  @Input() assignment!: Assignment;
  @Input() index!: number;
  student: Student | null = null;

  constructor(private assignmentService: AssignmentService,
              private studentService: StudentService
  ) { }

  ngOnInit() {
    this.student = this.studentService.getStudentWithId(this.assignment.studentId);
  }
}
