import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingPage from '../components/common/LoadingPage';
import todoRouter from './todoRouter';
import productsRouter from './productsRouter';
import memberRouter from './memberRouter';

// 지연 로딩 처리 : dynamic import
const Main = lazy(() => import('../pages/MainPage'));
const About = lazy(() => import('../pages/AboutPage'));
const TodoIndex = lazy(() => import('../pages/todo/TodoIndex'));
const ProductIndex = lazy(() => import('../pages/products/ProductIndex'));
const MemberIndex = lazy(() => import('../pages/member/MemberIndex'));

// 라우팅 설정 메인 파일
const Router = () => {
  return useRoutes([
    {
      path: '',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: 'about',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <About />
        </Suspense>
      ),
    }, //about
    {
      path: 'todo',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoIndex />
        </Suspense>
      ),
      children: todoRouter(),
    }, //todo
    {
      path: 'products',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ProductIndex />
        </Suspense>
      ),
      children: productsRouter(),
    }, // products
    {
      path: 'member',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MemberIndex />
        </Suspense>
      ),
      children: memberRouter(),
    }, // member
  ]);
};

export default Router;
