import { Injectable } from '@angular/core';
import { Appointment } from './schedule.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCK_SCHEDULE } from './MOCK-SCHEDULE';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  appointments: Appointment[] = [];
  private maxId: number = 9; // Track highest ID for new appointments
  // private url = 'http://localhost:3000/schedule'; // Commented out for mock data

  appointmentsChanged = new Subject<Appointment[]>();

  constructor(private http: HttpClient) {
    // Initialize with mock data
    this.appointments = MOCK_SCHEDULE.slice(); // Create a copy
    this.sortAndSend();
  }

  getAppointments() {
    // Using mock data - comment out to use HTTP requests
    this.sortAndSend();

    // HTTP request version (commented out):
    /*
    this.http.get<any>(this.url).subscribe(
      (response) => {
        console.log('Raw server response:', response);

        // Check if response has the expected structure
        if (response && response.schedules) {
          this.appointments = response.schedules || [];
        } else if (response && response.obj) {
          this.appointments = response.obj || [];
        } else if (Array.isArray(response)) {
          this.appointments = response;
        } else {
          this.appointments = [];
        }

        console.log('Processed appointments array:', this.appointments);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
    */
  }

  private sortAndSend() {
    this.appointments = this.appointments.filter(app => app && app.id);
    this.appointments.sort((a, b) => a.time.localeCompare(b.time));
    this.appointmentsChanged.next(this.appointments.slice());
  }

  getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find(app => app.id === id);
  }

  getAppointmentsForDay(day: string): Appointment[] {
    return this.appointments.filter(app => app.day === day);
  }

  addAppointment(newAppointment: Appointment) {
    if (!newAppointment) {
      return;
    }

    // Using mock data - comment out to use HTTP requests
    this.maxId++;
    newAppointment.id = this.maxId.toString();
    this.appointments.push(newAppointment);
    this.sortAndSend();

    // HTTP request version (commented out):
    /*
    newAppointment.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Appointment>(this.url, newAppointment, { headers: headers }).subscribe(
      (newAppointment: Appointment) => {
        this.appointments.push(newAppointment);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error adding appointment:', error);
      }
    );
    */
  }


  removeAppointment(appointmentId: string){
    const appointment = this.getAppointmentById(appointmentId);
    if (!appointment) {
      return null;
    }
    const pos = this.appointments.findIndex(a => a.id === appointment.id);
    if (pos < 0) {
      return null;
    }

    // Using mock data - comment out to use HTTP requests
    this.appointments.splice(pos, 1);
    this.sortAndSend();

    // HTTP request version (commented out):
    /*
    this.http.delete(`${this.url}/${appointment.id}`).subscribe(
      (response: any) => {
        this.appointments.splice(pos, 1);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error deleting appointment:', error);
      }
    );
    */

    return appointment;
  }
}
