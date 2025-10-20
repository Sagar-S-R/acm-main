'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userData = userStr ? JSON.parse(userStr) : null;
  const userTeam = userData?.team;
  const userRole = userData?.role;

  const getSidebarLinks = () => {
    const baseLinks = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/dashboard/profile', label: 'Profile' },
    ];

    const teamLinks: { [key: string]: { href: string; label: string }[] } = {
      'Documentation': [
        { href: '/dashboard/documentation/events', label: 'Manage Events' },
        { href: '/dashboard/documentation/resources', label: 'Manage Resources' },
        { href: '/dashboard/documentation/about', label: 'About Page' },
      ],
      'Design and Social Media': [
        { href: '/dashboard/design/upload', label: 'Upload Posters' },
        { href: '/dashboard/design/gallery', label: 'My Gallery' },
        { href: '/dashboard/social-media/create', label: 'Create Posts' },
        { href: '/dashboard/social-media/posts', label: 'My Posts' },
      ],
      'Event Management': [
        { href: '/dashboard/events', label: 'Manage Events' },
      ],
      'Technical': [
        { href: '/dashboard/admin/users', label: 'Manage Users' },
        { href: '/dashboard/admin/teams', label: 'Team Stats' },
      ],
    };

    let links = [...baseLinks, ...(teamLinks[userTeam || ''] || [])];

    // Add admin links for technical or admin roles
    if (userRole === 'technical' || userRole === 'admin') {
      links = [...links, ...teamLinks['Technical']];
    }

    return links;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">ACM Dashboard</h2>
          <p className="text-sm text-gray-500 mt-2">{userTeam}</p>
        </div>

        <nav className="mt-8">
          {getSidebarLinks().map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3 text-gray-700 hover:bg-gray-200 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
