import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Students } from './students/students';
import { Assignments } from './assignments/assignments';
import { ScheduleEdit} from './schedule/schedule-edit/schedule-edit';
import { StudentEdit } from './students/student-edit/student-edit';
import { StudentDetail } from './students/student-detail/student-detail';
import { Schedule } from './schedule/schedule';
import { AssignmentEdit } from './assignments/assignment-edit/assignment-edit';
import { AssignmentDetail } from './assignments/assignment-detail/assignment-detail';


const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: Students, children: [
    { path: 'new', component: StudentEdit },
    { path: ':id/edit', component: StudentEdit },
    { path: ':id', component: StudentDetail },
  ]},
  { path: 'assignments', component: Assignments, children: [
    { path: ':id/edit', component: AssignmentEdit },
    { path: ':id', component: AssignmentDetail },
  ]},
  { path: 'schedule', component: Schedule, children: [
    { path: 'new', component: ScheduleEdit },
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
