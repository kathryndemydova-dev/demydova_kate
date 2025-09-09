import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/Sidebar';

export default function Layout() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="client-page">
            <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <main>
                <Outlet context={{searchTerm}}/>
            </main>
            <ToastContainer position="top-right" autoClose={3000}/>
        </div>
    );
}