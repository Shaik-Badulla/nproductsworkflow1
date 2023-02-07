// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    roleedit: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/roleedit`),
    role: path(ROOTS_DASHBOARD, '/user/role'),
    rolenew: path(ROOTS_DASHBOARD, '/user/rolenew'),
  },
  customer: {
    root: path(ROOTS_DASHBOARD, '/customer'),
    list: path(ROOTS_DASHBOARD, '/customer/list'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/customer/${id}/edit`),
  },
  demo: {
    root: path(ROOTS_DASHBOARD, '/demo'),
    list: path(ROOTS_DASHBOARD, '/demo/list'),
    new: path(ROOTS_DASHBOARD, '/demo/new'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/demo/${id}/edit`),
  },
  hr: {
    root: path(ROOTS_DASHBOARD, '/hr'),

    projectedit: (id: string) => path(ROOTS_DASHBOARD, `/hr/${id}/projectedit`),
    project: path(ROOTS_DASHBOARD, '/hr/project'),
    projectnew: path(ROOTS_DASHBOARD, '/hr/projectnew'),

    taskedit: (id: string) => path(ROOTS_DASHBOARD, `/hr/${id}/taskedit`),
    task: path(ROOTS_DASHBOARD, '/hr/task'),
    tasknew: path(ROOTS_DASHBOARD, '/hr/tasknew'),

    subtaskedit: (id: string) => path(ROOTS_DASHBOARD, `/hr/${id}/subtaskedit`),
    subtask: path(ROOTS_DASHBOARD, '/hr/subtask'),
    subtasknew: path(ROOTS_DASHBOARD, '/hr/subtasknew'),

    timesheetattendanceedit: (id: string) =>
      path(ROOTS_DASHBOARD, `/hr/${id}/timesheetattendanceedit`),
    timesheetattendance: (weekStartDate: string) => path(ROOTS_DASHBOARD, `/hr/timesheetattendance/${weekStartDate}`),
    timesheetattendancenew: (weekStartDate: string) => path(ROOTS_DASHBOARD, `/hr/timesheetattendancenew/${weekStartDate}`),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
};
