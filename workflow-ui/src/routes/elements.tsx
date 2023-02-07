import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
export const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

export const UserListPage = Loadable(lazy(() => import('../pages/user/UserListPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/user/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/user/UserEditPage')));

// DASHBOARD: INVOICE
export const InvoiceListPage = Loadable(lazy(() => import('../pages/invoice/InvoiceListPage')));
export const InvoiceDetailsPage = Loadable(
  lazy(() => import('../pages/invoice/InvoiceDetailsPage'))
);
export const InvoiceCreatePage = Loadable(lazy(() => import('../pages/invoice/InvoiceCreatePage')));
export const InvoiceEditPage = Loadable(lazy(() => import('../pages/invoice/InvoiceEditPage')));

export const CrmListPage = Loadable(lazy(() => import('../pages/customer/CrmListPage')));
export const CrmCreatePage = Loadable(lazy(() => import('../pages/customer/CrmCreatePage')));
export const CrmEditPage = Loadable(lazy(() => import('../pages/customer/CrmEditPage')));

// all
export const DemoListPage = Loadable(lazy(() => import('../pages/demo/DemoListPage')));
export const DemoCreatePage = Loadable(lazy(() => import('../pages/demo/DemoCreatePage')));
export const DemoEditPage = Loadable(lazy(() => import('../pages/demo/DemoEditPage')));
