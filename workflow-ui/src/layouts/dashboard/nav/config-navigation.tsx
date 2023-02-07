// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const addingZero = (val: number) => val < 10 ? `0${val}` : val;
const today = new Date();
const formatDate = `${today.getFullYear()}-${addingZero(today.getMonth() + 1)}-${today.getDate()}`;

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'dashboard',
  //   items: [
  //     { title: 'One', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
  //     { title: 'Two', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
  //     { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'role', path: PATH_DASHBOARD.user.role },
        ],
      },
    ],
  },

  {
    subheader: 'CRM',
    items: [
      {
        title: 'customer',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.customer.list },
          { title: 'create', path: PATH_DASHBOARD.customer.new, roles: ['ROLE_SUPER_ADMIN'] },
        ],
      },
    ],
  },

  {
    subheader: 'Demo',
    items: [
      {
        title: 'All',
        path: PATH_DASHBOARD.demo.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.demo.list },
          { title: 'create', path: PATH_DASHBOARD.demo.new, roles: ['ROLE_SUPER_ADMIN'] },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'invoice',
    items: [
      {
        title: 'Invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
    ],
  },

  // HR
  // ----------------------------------------------------------------------
  {
    subheader: 'Timesheet',
    items: [
      {
        title: 'Timesheet Details',
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.user,
        children: [
          { title: 'projects', path: PATH_DASHBOARD.hr.project },
          { title: 'tasks', path: PATH_DASHBOARD.hr.task },
          { title: 'subtasks', path: PATH_DASHBOARD.hr.subtask },
          { title: 'attendance', path: PATH_DASHBOARD.hr.timesheetattendance(formatDate) },
        ],
      },
    ],
  },
];

export default navConfig;
