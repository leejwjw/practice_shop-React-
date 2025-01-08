import { lazy, Suspense } from 'react';
import LoadingPage from '../components/common/LoadingPage';
const Login = lazy(() => import('../pages/member/LoginPage'));
const Logout = lazy(() => import('../pages/member/LogoutPage'));

const memberRouter = () => {
  return [
    {
      path: 'login',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: 'logout',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Logout />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
