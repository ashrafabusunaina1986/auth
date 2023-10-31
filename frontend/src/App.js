import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import EventPage, { loader as eventLoader } from './pages/Event';
import NewEventPage from './pages/NewEvent';
import EvenetDetailPage, { loader as eventItemloader, action as deleteAction } from './pages/EvenetDetail';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import { action as manipulationEventAction } from './components/EventForm'
import NewsLetterPage, { action as NewsLetterAction } from './pages/NewsLetter';
import Authentication, { action as authAction } from './pages/Authentication';
import { checkLoader, tokenLoader } from './auth'
import { action as logoutAction } from './pages/Logout'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'Root',
    loader: tokenLoader,
    children:
      [
        { index: true, element: <HomePage /> },
        {
          path: 'events', element: <EventsRootLayout />,

          children: [
            {
              index: true, element: <EventPage />,
              loader: eventLoader
            },
            {
              path: ':eventId',
              id: 'event-details',
              children: [
                {
                  index: true,
                  element: <EvenetDetailPage />,
                  action: deleteAction
                },
                {
                  path: 'edit',
                  element: < EditEventPage />,
                  action: manipulationEventAction,
                  loader:checkLoader
                }
              ],
              loader: eventItemloader,
            },
            {
              path: 'new',
              element: <NewEventPage />,
              action: manipulationEventAction,
              loader:checkLoader
            }
          ]
        },
        {
          path: 'auth',
          element: <Authentication />,
          action: authAction
        },
        {
          path: 'newsletter',
          element: <NewsLetterPage />,
          action: NewsLetterAction
        },
        {
          path: 'logout',
          action: logoutAction
        }
      ]
  }

])

function App() {
  return <RouterProvider router={router} />
}

export default App;
