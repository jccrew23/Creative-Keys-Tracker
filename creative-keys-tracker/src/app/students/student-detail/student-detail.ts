import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.html',
  styleUrls: ['./student-detail.css']
})
export class StudentDetail implements OnInit {
  @Input() student: Student | null = null;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
      const id = params['id'];
      this.student = this.studentService.getStudent(id);
    });
  }

  deleteStudent() {
    if (this.student && this.student.id) {
      this.studentService.deleteStudent(this.student.id);
      this.router.navigate(['/students']);
    }
  }
}
