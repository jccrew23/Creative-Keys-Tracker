import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';


@Component({
  selector: 'app-assignment-list',
  standalone: false,
  templateUrl: './assignment-list.html',
  styleUrls: ['./assignment-list.css']
})
export class AssignmentList implements OnInit {
  assignments: Assignment[] = [];


  constructor(private assignmentService: AssignmentService) {}

  ngOnInit() {

    this.assignmentService.assignmentListChangedEvent.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );

    this.assignmentService.getAssignments();

  }

}
