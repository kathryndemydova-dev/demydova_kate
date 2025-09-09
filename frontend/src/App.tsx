import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import ClientList from './pages/ClientList';
import AddClientForm from './pages/AddClientForm';
import EditClientForm from './pages/EditClientForm';
import PaymentPage from './pages/PaymentPage';
import NotFound from './pages/NotFound';
import FAQ from "./pages/FAQ/FAQ.tsx";
import './App.css'
import Dashboard from "./pages/Dashboard.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ClientList/>}/>
                    <Route path="addclient" element={<AddClientForm/>}/>
                    <Route path="payments" element={<PaymentPage/>}/>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="faq" element={<FAQ/>}/>
                    <Route path="clients/:id/edit" element={<EditClientForm/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;