import { Injectable, EventEmitter } from '@angular/core';
import { Assignment } from './assignment.model';
import { Subject } from 'rxjs';
import { Student } from '../students/student.model';
import { StudentService } from '../students/student.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [];
  private url = 'http://localhost:3000/assignments';

  assignmentSelectedEvent = new EventEmitter<Assignment>();
  assignmentChangedEvent = new EventEmitter<Assignment[]>();
  assignmentListChangedEvent = new Subject<Assignment[]>();

  maxDocumentId!: string;

  constructor(private httpClient: HttpClient, private studentService: StudentService) {
    // Don't automatically call getAssignments() to avoid infinite loops
  }

    getAssignments(): Assignment[] {
      this.httpClient.get<any>(this.url)
        .subscribe(
          (response) => {
            // Check if response has the expected structure
            if (response && response.assignments) {
              this.assignments = response.assignments || [];
            } else if (Array.isArray(response)) {
              this.assignments = response;
            } else {
              this.assignments = [];
            }

            this.sortAndSend();
          },
          (error) => {
            console.error('Error fetching assignments:', error);
          }
        );
      return this.assignments;
    }

    getAssignmentsList(): Assignment[] {
      return this.assignments.slice();
    }

    private sortAndSend() {
    // Filter out null/undefined assignments, but be more lenient with studentId
    this.assignments = this.assignments.filter(assignment => assignment && assignment.id);

    // Sort by studentId, handling null/undefined values
    this.assignments.sort((a, b) => {
      const idA = a.studentId || '';
      const idB = b.studentId || '';
      return idA.localeCompare(idB);
    });

    this.assignmentListChangedEvent.next(this.assignments.slice());
  }

    getAssignment(id: string): Assignment | null {
      for (let assignment of this.assignments) {
        if (assignment.id === id) {
          return assignment;
        }
      }
      return null;
    }


    updateAssignment(originalAssignment: Assignment, newAssignment: Assignment) {
      if (!originalAssignment || !newAssignment) {
        return;
      }
      const pos = this.assignments.indexOf(originalAssignment);
      if (pos < 0) {
        return;
      }
      newAssignment.id = originalAssignment.id;
      newAssignment._id = originalAssignment._id; // Ensure _id is preserved for MongoDB
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.httpClient.put<{ message: string, assignment: Assignment }>(`${this.url}/${originalAssignment.id}`, newAssignment, { headers })
        .subscribe(
          (response) => {
            // Extract assignment from server response
            const updatedAssignment = response.assignment || response;
            this.assignments[pos] = updatedAssignment;
            this.sortAndSend();
          },
          (error) => {
            console.error('Error updating assignment:', error);
          }
        );
    }

    getStudentName(studentId: string): string {
      // Use the cached students array to avoid triggering HTTP requests
      const students = this.studentService.students;
      const student = students.find(s => s.id === studentId);

      if (student && student.firstName && student.lastName) {
        return `${student.firstName} ${student.lastName}`;
      }
      return `Student ID: ${studentId}`; // Show the ID if name not found
    }

    addAssignment(newAssignment: Assignment) {
      if (!newAssignment) {
        return;
      }
      newAssignment.id = '';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.httpClient.post<any>(this.url, newAssignment, { headers: headers }).subscribe(
        (response) => {
          const addedAssignment = response.assignment || response;
          this.assignments.push(addedAssignment);
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error adding assignment:', error);
        }
      );
    }

    deleteAssignment(assignmentId: string): void {
      const assignment = this.getAssignment(assignmentId);
      if (!assignment) {
        return;
      }
      const pos = this.assignments.indexOf(assignment);
      if (pos < 0) {
        return;
      }
      this.httpClient.delete(`${this.url}/${assignment.id}`).subscribe(
        (response: any) => {
          this.assignments.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error deleting assignment:', error);
        }
      );
    }
}
