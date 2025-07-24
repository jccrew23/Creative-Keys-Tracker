import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';
import { WindowRef } from '../../window-ref.service';
import { Student } from '../../students/student.model';
import { StudentService } from '../../students/student.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: false,
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.css']
})
export class AssignmentDetail {
  assignment: Assignment | null = null;
  id!: string;
  nativeWindow: any;
  student: Student | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRef: WindowRef,
    private studentService: StudentService
  ) {}

  ngOnIniit() {
    this.nativeWindow = this.windowRef.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.assignment = this.assignmentService.getAssignment(this.id);
    });

    this.student = this.studentService.getStudent(this.id);
  }
}
