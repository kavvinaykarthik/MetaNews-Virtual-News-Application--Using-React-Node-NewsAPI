import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupLogin from './SignupLogin'; // Import SignupLogin component
import NewsTree from './NewsTree';
import CategoryNews from './CategoryNews';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupLogin />} /> {/* Default route */}
                <Route path="/login" element={<SignupLogin />} /> {/* Route for authentication */}
                <Route path="/news" element={<NewsTree />} /> {/* Protected route for NewsTree */}
                <Route path="/category/:category" element={<CategoryNews />} /> {/* Protected route for CategoryNews */}
            </Routes>
        </Router>
    );
};

export default App;
