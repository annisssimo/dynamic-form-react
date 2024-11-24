import { createBrowserRouter, RouterProvider } from 'react-router';

import './App.css';
import ListPage from './pages/ListPage/ListPage';
import EditPage from './pages/EditPage/EditPage';
import CreatePage from './pages/CreatePage/CreatePage';
import { getAllContacts } from './api/api';
import { getContactById } from './api/api';

const router = createBrowserRouter(
  [
    {
      element: <ListPage />,
      path: '/',
      loader: async () => {
        const contacts = await getAllContacts();
        return { contacts };
      },
    },
    {
      element: <CreatePage />,
      path: '/create',
    },
    {
      element: <EditPage />,
      path: '/edit/:id',
      loader: async ({ params }) => {
        const contact = await getContactById(params.id);
        return { contact };
      },
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
