import React, { useContext } from 'react';
import Home from '../components/pages/Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function Content() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default Content;