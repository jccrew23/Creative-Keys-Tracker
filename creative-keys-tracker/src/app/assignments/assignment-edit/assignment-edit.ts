import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-assignment-edit',
  standalone: false,
  templateUrl: './assignment-edit.html',
  styleUrls: ['./assignment-edit.css']
})
export class AssignmentEdit implements OnInit {
  assignment: Assignment = {
    id: '',
    studentId: '',
    warmUpName: '',
    warmUpNotes: '',
    techniquePage: 0,
    techniqueNotes: '',
    performancePage: 0,
    performanceNotes: '',
    theoryPage: 0,
    theoryNotes: '',
    additionalNotes: ''
  }
  originalAssignment: Assignment | null = null;
  editMode: boolean = false;

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === null || id === undefined) {
        this.editMode = false;
        return;
      }
      this.originalAssignment = this.assignmentService.getAssignment(id);
      if (this.originalAssignment === null) {
        return;
      }
      this.editMode = true;
      this.assignment = JSON.parse(JSON.stringify(this.originalAssignment)); // Deep copy to avoid reference issues
    });
  }

  onSubmit(form: NgForm): void {
   const value = form.value;
    const newAssignment = new Assignment(
      value.id,
      value.studentId,
      value.warmUpName,
      value.warmUpNotes,
      value.techniquePage,
      value.techniqueNotes,
      value.performancePage,
      value.performanceNotes,
      value.theoryPage,
      value.theoryNotes,
      value.additionalNotes
    );

    if (this.editMode === true) {
      if (this.originalAssignment) {
        this.assignmentService.updateAssignment(this.originalAssignment, newAssignment);
      }
    } else {
      this.assignmentService.addAssignment(newAssignment);
    }

    this.router.navigate(['/assignments']);

  }

  onCancel(): void {
    this.router.navigate(['/assignments']);
  }
}
