import {createBrowserRouter} from 'react-router-dom';
import Layout from '../Layout/Layout';
import ClientList from '../pages/ClientList';
import AddClientForm from '../pages/AddClientForm';
import EditClientForm from '../pages/EditClientForm';
import PaymentPage from '../pages/PaymentPage';
import NotFound from '../pages/NotFound';
import FAQ from "../pages/FAQ/FAQ.tsx";
import Dashboard from "../pages/Dashboard.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {index: true, element: <ClientList/>},
            {path: 'addclient', element: <AddClientForm/>},
            {path: 'clients/:id/edit', element: <EditClientForm/>},
            {path: 'payments', element: <PaymentPage/>},
            {path: 'dashboard', element: <Dashboard />},
            {path: 'faq', element: <FAQ/>},
            {path: '*', element: <NotFound/>},
        ],
    },
]);

export default router;