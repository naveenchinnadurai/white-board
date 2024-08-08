import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './pages/Register';
import WhiteBoard from './pages/WhiteBoard';
function Layout() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/whiteboard" element={<WhiteBoard />} />
            </Routes>
        </Router>
    )
}

export default Layout