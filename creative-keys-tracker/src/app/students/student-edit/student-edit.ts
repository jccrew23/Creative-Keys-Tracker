import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-student-edit',
  standalone: false,
  templateUrl: './student-edit.html',
  styleUrls: ['./student-edit.css']
})

export class StudentEdit implements OnInit {
  originalStudent!: Student | null;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    age: 0,
    level: '',
    parentName: '',
    parentRelationship: '',
    parentPhone: '',
    parentEmail: '',
    _id: ''
  };
  editMode: boolean = false;
  id!: string;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalStudent = this.studentService.getStudent(this.id);
      if (!this.originalStudent) {
        return;
      }

      this.editMode = true;
      this.student = JSON.parse(JSON.stringify(this.originalStudent));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStudent = new Student(
      this.editMode ? this.originalStudent?.id || '' : '', // Use empty string for new students
      value.firstName,
      value.lastName,
      value.age,
      value.level,
      value.parentName,
      value.parentRelationship,
      value.parentPhone,
      value.parentEmail,
      this.editMode ? this.originalStudent?._id || '' : '' // Use empty string for new students
    );

    if (this.editMode && this.originalStudent) {
      this.studentService.updateStudent(this.originalStudent, newStudent);
    } else {
      this.studentService.addStudent(newStudent);
    }

    this.router.navigate(['/students']);
  }

  onCancel() {
    this.router.navigate(['/students']);
  }
}
