import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentService } from './assignment.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-assignments',
  standalone: false,
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.css']
})
export class Assignments implements OnInit, OnDestroy {
  selectedAssignment!: Assignment;
  assignments: Assignment[] = [];
  private subscription!: Subscription;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.assignmentSelectedEvent.subscribe(
      (assignment: Assignment) => {
        this.selectedAssignment = assignment;
      }
    );

    this.subscription = this.assignmentService.assignmentListChangedEvent.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
