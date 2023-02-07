import { IUser } from './user';
import { HRProject } from './hrproject';
import { HRTask } from './hrtask';
import { HRSubtask } from './hrsubtask';

export type HRTimesheetAttendance = {
  id: string;
  c0: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  c6: string;
  total: string;
  remarks?: string;
  weekStartDate?: Date | string | number;
  user: IUser;
  project: HRProject;
  task: HRTask;
  subtask: HRSubtask
};

export type HRTimesheetAttendanceRequest = {
  id?: string;
  c0?: string;
  c1?: string;
  c2?: string;
  c3?: string;
  c4?: string;
  c5?: string;
  c6?: string;
  total?: string;
  remarks?: string;
  weekStartDate?: Date | string | number;
  userId: string;
  projectsId: string;
  taskId: string;
  subtaskId: string;
};

export type HRTimesheetAttendanceState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  hrTimesheetAttendances: HRTimesheetAttendance[];
  hrTimesheetAttendance: HRTimesheetAttendance | null;
  sortBy: string | null;
  filters: {
    name: string;
  };
  selectedHRTimesheetAttendanceName: string;
};
