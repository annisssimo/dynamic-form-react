import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import ListPage from './pages/ListPage/ListPage';
import EditPage from './pages/EditPage/EditPage';

const router = createBrowserRouter(
  [
    {
      element: <ListPage />,
      path: '/',
    },
    {
      element: <EditPage />,
      path: '/edit',
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const App = () => {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};

export default App;
