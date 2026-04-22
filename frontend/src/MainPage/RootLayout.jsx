import { Outlet } from "react-router-dom"
import Navbar from '../common/Navbar.jsx'
import './RootLayout.css'
import Sidebar from "../common/Sidebar.jsx";

export default function RootLayout() {
    return(
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}
