import { Appointment } from './schedule.model';

export const MOCK_SCHEDULE: Appointment[] = [
  {
    id: '1',
    time: '09:00',
    day: 'Monday',
    studentId: '1' // Ava Johnson
  },
  {
    id: '2',
    time: '10:00',
    day: 'Monday',
    studentId: '2' // Leo Martinez
  },
  {
    id: '3',
    time: '11:00',
    day: 'Monday',
    studentId: '3' // Maya Chen
  },
  {
    id: '4',
    time: '14:00',
    day: 'Tuesday',
    studentId: '4' // Ethan Williams
  },
  {
    id: '5',
    time: '15:00',
    day: 'Tuesday',
    studentId: '5' // Sofia Brown
  },
  {
    id: '6',
    time: '16:00',
    day: 'Wednesday',
    studentId: '6' // Noah Garcia
  },
  {
    id: '7',
    time: '10:00',
    day: 'Thursday',
    studentId: '7' // Olivia Davis
  },
  {
    id: '8',
    time: '13:00',
    day: 'Friday',
    studentId: '1' // Ava Johnson (second lesson)
  },
  {
    id: '9',
    time: '14:00',
    day: 'Friday',
    studentId: '3' // Maya Chen (second lesson)
  }
];
