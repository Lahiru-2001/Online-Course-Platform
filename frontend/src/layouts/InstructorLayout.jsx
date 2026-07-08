import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import RoleBasedSidebar from '../components/common/RoleBasedSidebar';
import Footer from '../components/common/Footer';

export default function InstructorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FF] overflow-hidden">
      {/* Top Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Flex container for sidebar and content area */}
      <div className="flex flex-1 overflow-hidden">
        <RoleBasedSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Full width footer at the very bottom */}
      <Footer />
    </div>
  );
}
