import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * AuthLayout wrapper for pages that need the standard public Navbar and Footer
 * (e.g., Login, Register).
 */
const AuthLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* This will render the nested route components like AuthPage */}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
