export class Assignment {
  constructor(
    public id: string,
    public studentId: string,
    public warmUpName: string,
    public warmUpNotes: string,
    public techniquePage: number,
    public techniqueNotes: string,
    public performancePage: number,
    public performanceNotes: string,
    public theoryPage: number,
    public theoryNotes: string,
    public additionalNotes: string,
    public _id?: string
  ) {}
}

