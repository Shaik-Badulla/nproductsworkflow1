import { ElementType, Suspense, lazy } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import { useAuthContext } from 'src/auth/useAuthContext';
// auth

import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageSix,
  PageFour,
  PageFive,
  LoginPage,
  PageThree,
  // Dashboard: Invoice
  InvoiceListPage,
  UserListPage,
  UserCreatePage,
  UserEditPage,
  InvoiceDetailsPage,
  InvoiceEditPage,
  InvoiceCreatePage,
  CrmListPage,
  CrmEditPage,
  CrmCreatePage,
  DemoListPage,
  DemoEditPage,
  DemoCreatePage,
  RegisterPage,
  ResetPasswordPage,
  NewPasswordPage,
  VerifyCodePage,
} from './elements';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuthContext();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            // { path: 'four', element: <PageFour /> },
            // { path: 'five', element: <PageFive /> },
            // { path: 'six', element: <PageSix /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':id/edit', element: <UserEditPage /> },

            // Role
            { element: <Navigate to="/dashboard/user/role" replace />, index: true },
            { path: 'role', element: <RoleList /> },
            { path: 'rolenew', element: <RoleCreate /> },
            { path: ':id/roleedit', element: <RoleCreate /> },
          ],
        },
        {
          path: 'customer',
          children: [
            { element: <Navigate to="/dashboard/customer/list" replace />, index: true },
            { path: 'list', element: <CrmListPage /> },
            { path: ':id/edit', element: <CrmEditPage /> },
            { path: 'new', element: <CrmCreatePage /> },
          ],
        },
        {
          path: 'demo',
          children: [
            { element: <Navigate to="/dashboard/demo/list" replace />, index: true },
            { path: 'list', element: <DemoListPage /> },
            { path: ':id/edit', element: <DemoEditPage /> },
            { path: 'new', element: <DemoCreatePage /> },
          ],
        },
        {
          path: 'hr',
          children: [
            // Status
            // { element: <Navigate to="/dashboard/hr/status" replace />, index: true },
            // { path: 'status', element: <HRStatusList /> },
            // { path: 'statusnew', element: <HRStatusCreate /> },
            // { path: ':id/statusedit', element: <HRStatusCreate /> },

            // Project
            { element: <Navigate to="/dashboard/hr/project" replace />, index: true },
            { path: 'project', element: <HRProjectList /> },
            { path: 'projectnew', element: <HRProjectCreate /> },
            { path: ':id/projectedit', element: <HRProjectCreate /> },

            // Task
            { element: <Navigate to="/dashboard/hr/task" replace />, index: true },
            { path: 'task', element: <HRTaskList /> },
            { path: 'tasknew', element: <HRTaskCreate /> },
            { path: ':id/taskedit', element: <HRTaskCreate /> },

            // Subtask
            { element: <Navigate to="/dashboard/hr/subtask" replace />, index: true },
            { path: 'subtask', element: <HRSubtaskList /> },
            { path: 'subtasknew', element: <HRSubtaskCreate /> },
            { path: ':id/subtaskedit', element: <HRSubtaskCreate /> },

            //  TimesheetAttendance
            { element: <Navigate to="/dashboard/hr/timesheetattendance" replace />, index: true },
            { path: 'timesheetattendance/:weekStartDate', element: <HRTimesheetAttendanceList /> },
            { path: 'timesheetattendancenew/:weekStartDate', element: <HRTimesheetAttendanceCreate /> },
            { path: ':id/timesheetattendanceedit', element: <HRTimesheetAttendanceCreate /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/', element: <Navigate to="/dashboard" replace /> },
  ]);
}

// Role
const RoleList = Loadable(lazy(() => import('../pages/role/RoleList')));
const RoleCreate = Loadable(lazy(() => import('../pages/role/RoleCreate')));

// Project
const HRProjectList = Loadable(lazy(() => import('../pages/hr/project/ProjectList')));
const HRProjectCreate = Loadable(lazy(() => import('../pages/hr/project/ProjectCreate')));

// Task
const HRTaskList = Loadable(lazy(() => import('../pages/hr/task/TaskList')));
const HRTaskCreate = Loadable(lazy(() => import('../pages/hr/task/TaskCreate')));

// Subtask
const HRSubtaskList = Loadable(lazy(() => import('../pages/hr/subtask/SubtaskList')));
const HRSubtaskCreate = Loadable(lazy(() => import('../pages/hr/subtask/SubtaskCreate')));

// TimesheetAttendanceState
const HRTimesheetAttendanceList = Loadable(
  lazy(() => import('../pages/hr/timesheetattendance/TimesheetAttendanceList'))
);
const HRTimesheetAttendanceCreate = Loadable(
  lazy(() => import('../pages/hr/timesheetattendance/TimesheetAttendanceCreate'))
);
