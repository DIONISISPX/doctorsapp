import { jwtDecode } from 'jwt-decode'; // Use named import
import { Navigate } from 'react-router-dom'; 

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp > currentTime) {
                return children; 
            } else {
                console.warn("Token has expired");
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('token');
        }
    }
    return <Navigate to="/" />;
}

export default ProtectedRoute;