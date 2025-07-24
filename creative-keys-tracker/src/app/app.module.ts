import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';
import { Header } from './header';
import { StudentItem } from './students/student-item/student-item';
import { CommonModule } from '@angular/common';
import { StudentFilterPipe } from './students/student-filter.pipe';
import { StudentDetail } from './students/student-detail/student-detail';
import { StudentEdit } from './students/student-edit/student-edit';
import { StudentList } from './students/student-list/student-list';
import { Students } from './students/students';
import { AssignmentDetail } from './assignments/assignment-detail/assignment-detail';
import { AssignmentEdit } from './assignments/assignment-edit/assignment-edit';
import { AssignmentItem } from './assignments/assignment-item/assignment-item';
import { AssignmentList } from './assignments/assignment-list/assignment-list';
import { Assignments } from './assignments/assignments';
import { ScheduleList } from './schedule/schedule-list/schedule-list';
import { ScheduleItem } from './schedule/schedule-item/schedule-item';
import { ScheduleEdit } from './schedule/schedule-edit/schedule-edit';
import { Schedule } from './schedule/schedule';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleList,
    ScheduleItem,
    ScheduleEdit,
    Header,
    StudentList,
    StudentItem,
    StudentFilterPipe,
    StudentDetail,
    StudentEdit,
    StudentList,
    Students,
    AssignmentDetail,
    AssignmentEdit,
    AssignmentItem,
    AssignmentList,
    Assignments,
    Schedule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
