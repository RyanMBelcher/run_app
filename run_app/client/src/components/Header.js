import React, { useState } from 'react';
import Home from './pages/Home';
import Navbar from './pages/Navbar'

export default function Header() {
    const [currentPage, setPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home />
        }
        // if (currentPage === '')
    };

    const handlePageChange = (page) => setPage(page);

    return (
        <div>
            <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    )
}