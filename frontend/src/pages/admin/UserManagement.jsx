import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Pencil, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function UserManagement() {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState(location.state?.role || 'All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const users = [
    { name: 'Aruni Perera', email: 'aruni.p@student.lk', role: 'Student', status: 'Active', date: 'Jan 12, 2024', img: 'https://i.pravatar.cc/32?img=21' },
    { name: 'Prof. Kalinga Silva', email: 'kalinga.silva@lms.edu', role: 'Instructor', status: 'Active', date: 'Oct 05, 2023', img: 'https://i.pravatar.cc/32?img=22' },
    { name: 'Dilantha Wickramasinghe', email: 'admin.dilantha@lms.lk', role: 'Admin', status: 'Inactive', date: 'Mar 22, 2023', img: 'https://i.pravatar.cc/32?img=23' }
  ];

  const filteredUsers = users.filter((u) => {
    const matchesRole = selectedRole === 'All' || u.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || u.status === selectedStatus;
    return matchesRole && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header and top stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">User Management</h1>
          <p className="text-xs text-gray-400">Oversee system roles, manage permissions, and track platform activity across Sri Lanka.</p>
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto justify-end">
          <Card className="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-xl shrink-0">
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Active Users</span>
              <h4 className="text-sm font-black text-gray-800 mt-0.5">12,482</h4>
            </div>
            <span className="text-[9px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-full shrink-0">+2%</span>
          </Card>
          <Card className="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-xl shrink-0">
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Inactive</span>
              <h4 className="text-sm font-black text-gray-800 mt-0.5">1,204</h4>
            </div>
            <span className="text-[9px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded-full shrink-0">-1.2%</span>
          </Card>
        </div>
      </div>

      {/* Filter toolbar matching Screenshot 11 */}
      <Card className="border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-orange-500"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
          </div>

          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 text-gray-700 font-bold outline-none cursor-pointer"
          >
            <option value="All">User Role</option>
            <option>Student</option>
            <option>Instructor</option>
            <option>Admin</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 text-gray-700 font-bold outline-none cursor-pointer"
          >
            <option value="All">Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <Button variant="primary" className="py-2 px-5 text-xs font-bold uppercase tracking-wider shrink-0 w-full md:w-auto">
          Apply
        </Button>
      </Card>

      {/* User registry table */}
      <Card className="border border-gray-200/80 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={u.img} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-800">{u.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded uppercase ${
                      u.role === 'Student' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : u.role === 'Instructor' 
                          ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{u.status}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{u.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 bg-gray-50 text-gray-500 hover:bg-orange-500 hover:text-white rounded border border-gray-200 transition-all">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-semibold">
          <span>Showing 1 to 10 of 12,698 users</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50">1</button>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">2</button>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">3</button>
            <span className="px-1.5 py-1">...</span>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">126</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
