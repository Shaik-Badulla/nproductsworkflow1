export type Demo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: Date | string | number;
  type: string;
  disabled?: boolean;
  description?: string;
};

export type DemoRequest = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  joinDate?: string;
  password?: string;
  type?: string;
};

export type DemoState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  demos: Demo[];
  demo: Demo | null;
  sortBy: string | null;
  filters: {
    email: string;
  };
  selectedDemosName: string;
};
