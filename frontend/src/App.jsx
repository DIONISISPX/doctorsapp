// App.jsx
import Login from './Login/Login.jsx';
import Register from './Login/Register.jsx';
import Home from './MainPage/Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Appointments from './MainPage/Appointments.jsx';
import RootLayout from './MainPage/RootLayout.jsx';
import LandingPage from './LandingPage.jsx'; // Add this import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />, // Changed from <Login /> to <LandingPage />
    },
    {
      path: '/login',
      element: <Login />, // Moved login to its own route
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'appointments', element: <Appointments /> },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;