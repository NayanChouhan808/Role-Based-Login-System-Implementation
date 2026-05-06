import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    Home,
    Users,
    LogOut,
    Menu,
    X,
    CheckCircle,
    PlusCircle,
    FileText,
    Calculator,
    ShieldCheck
} from 'lucide-react';
import axios from 'axios';

const DashboardLayout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navItems = [
        {
            name: 'Dashboard',
            path: `/${user?.role?.toLowerCase()}/dashboard`,
            icon: <Home size={20} />,
            roles: ['ADMIN', 'VERIFIER', 'USER'],
        },
        {
            name: 'Create Loan',
            path: '/user/create-loan',
            icon: <PlusCircle size={20} />,
            roles: ['USER'],
        },
        {
            name: 'EMI Calculator',
            path: '/user/emi-calculator',
            icon: <Calculator size={20} />,
            roles: ['USER'],
        },
        {
            name: 'Eligibility Checker',
            path: '/user/eligibility',
            icon: <ShieldCheck size={20} />,
            roles: ['USER'],
        },
        {
            name: 'Verify Loans',
            path: '/verifier/verify',
            icon: <CheckCircle size={20} />,
            roles: ['VERIFIER'],
        },
        {
            name: 'Approve Loans',
            path: '/admin/approve',
            icon: <CheckCircle size={20} />,
            roles: ['ADMIN'],
        },
        {
            name: 'Manage Users',
            path: '/admin/users',
            icon: <Users size={20} />,
            roles: ['ADMIN'],
        },
    ];

    const filteredNavItems = navItems.filter(item =>
        user && item.roles.includes(user.role as any)
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-transparent">
            <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
                <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-md mr-2">
                        <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Loan Manager</h1>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`
        ${sidebarOpen ? 'block fixed inset-0 z-10 pt-16' : 'hidden'} 
        md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:m-4 glass-card border-none w-full md:w-72 shadow-xl
        transition-all duration-300 ease-in-out overflow-y-auto md:flex md:flex-col
      `}>
                <div className="p-6 hidden md:flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Loan Manager</h1>
                </div>
                <div className="px-6 py-5 border-b border-gray-200/40">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner text-white rounded-xl w-12 h-12 flex items-center justify-center text-lg font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <nav className="mt-6 flex-grow">
                    <div className="px-6 py-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</p>
                    </div>
                    <ul className="space-y-1">
                        {filteredNavItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`
                    flex items-center space-x-3 px-6 py-3 transition-all duration-200
                    ${isActive(item.path)
                                            ? 'text-indigo-700 bg-gradient-to-r from-indigo-50/80 to-transparent border-l-4 border-indigo-600 font-semibold'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50 border-l-4 border-transparent'}
                  `}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors py-2"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;