import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from '@/app'
import Dashboard from './pages/dashboard'
import Requests from './pages/requests'
import NewRequest from './pages/new-request'

import '@/shared/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'requests',
        element: <Requests />
      },
      {
        path: 'new-request',
        element: <NewRequest />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
