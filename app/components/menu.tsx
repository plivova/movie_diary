'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Heart } from 'lucide-react';

const links = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/watchlist', label: 'Watchlist', icon: Film },
    { href: '/dashboard/diary', label: 'Diary', icon: Heart },
];

export default function Menu() {
    const pathname = usePathname(); // Client Component hook that lets you read the current URL's pathname.

    return (
        <nav className="flex justify-center m-8">
            <div className="inline-flex items-center rounded-full bg-white shadow-md dark:bg-gray-800 px-2 py-1 space-x-2">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                ${isActive
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                            }`}
                        >
                            <LinkIcon className="w-5 h-5" />
                            <span className="hidden md:inline">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
