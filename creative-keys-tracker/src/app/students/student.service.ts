import { Injectable, EventEmitter } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];
  private url = 'http://localhost:3000/students';
  private selectedStudent: Student | null = null;

  studentListChangedEvent = new Subject<Student[]>();
  studentSelectedEvent = new EventEmitter<Student>();
  studentChangedEvent = new EventEmitter<Student>();

  constructor(private http: HttpClient) {
    // Don't automatically call getStudents() to avoid infinite loops
  }


  getStudents(): Student[] {
    this.http.get<any>(this.url).subscribe(
      (response) => {
        // Check if response has the expected structure
        if (response && response.students) {
          this.students = response.students || [];
        } else if (Array.isArray(response)) {
          this.students = response;
        } else {
          this.students = [];
        }

        this.sortAndSend();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
    return this.students;
  }

  private sortAndSend() {
    // Add safety check for sorting
    this.students = this.students.filter(student => student && student.firstName);
    this.students.sort((a, b) => {
      const nameA = a.firstName || '';
      const nameB = b.firstName || '';
      return nameA.localeCompare(nameB);
    });
    this.studentListChangedEvent.next(this.students.slice());
  }

  getStudent(id: string): Student | null {
    for (let student of this.students) {
      if (student.id === id) {
        return student;
      }
    }
    return null;
  }

  addStudent(newStudent: Student) {
    if (!newStudent) {
      return;
    }
    newStudent.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(this.url, newStudent, { headers: headers }).subscribe(
      (response) => {
        // Extract student from server response
        const addedStudent = response.student || response;
        this.students.push(addedStudent);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error adding student:', error);
      }
    );
  }

  updateStudent(originalStudent: Student, newStudent: Student) {
    if (!originalStudent || !newStudent) {
      return;
    }
    const pos = this.students.indexOf(originalStudent);
    if (pos < 0) {
      return;
    }
    newStudent.id = originalStudent.id;
    newStudent._id = originalStudent._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<any>(`${this.url}/${originalStudent.id}`, newStudent, { headers: headers })
      .subscribe(
        (response) => {
          // Extract student from server response
          const updatedStudent = response.student || response;
          this.students[pos] = updatedStudent;
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error updating student:', error);
        }
      );
  }

  getStudentWithId(id: string): Student | null {
    for (let student of this.students) {
      if (student.id === id) {
        return student;
      }
    }
    return null;
  }

  deleteStudent(studentId: string): void {
    const student = this.getStudentWithId(studentId);
    if (!student) {
      return;
    }
    const pos = this.students.indexOf(student);
    if (pos < 0) {
      return;
    }
    this.http.delete(`${this.url}/${student.id}`).subscribe(
      (response: any) => {
        this.students.splice(pos, 1);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  setSelectedStudent(student: Student | null): void {
    this.selectedStudent = student;
    if (student) {
      this.studentSelectedEvent.emit(student);
    }
  }

  getSelectedStudent(): Student | null {
    return this.selectedStudent;
  }

}


