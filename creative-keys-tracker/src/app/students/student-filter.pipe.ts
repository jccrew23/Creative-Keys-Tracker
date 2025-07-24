import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student.model';

@Pipe({
  name: 'studentFilter',
  standalone: false

})
export class StudentFilterPipe implements PipeTransform {

    transform(students: Student[], term:string): any {
    let filteredStudents: Student[] = [];

    for (let student of students) {
      if (student.firstName.toLowerCase().includes(term.toLowerCase()) || student.lastName.toLowerCase().includes(term.toLowerCase())) {
        filteredStudents.push(student);
      }
    }
    if (filteredStudents.length === 0) {
      return students;
  }
    return filteredStudents;
  }

}
