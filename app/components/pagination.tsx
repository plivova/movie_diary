'use client';

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({totalPages, currentPage}: { totalPages: number, currentPage?: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center gap-2 my-8">
            {/* Previous button */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={clsx(
                    'px-3 py-1 border rounded-md text-sm',
                    currentPage === 1
                        ? 'text-gray-400 border-gray-300 pointer-events-none disabled:cursor-not-allowed'
                        : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                )}
                aria-disabled={currentPage === 1}
            >
                <ArrowBigLeft className="h-4 w-4" />
            </Link>

            {/* Next button */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={clsx(
                    'px-3 py-1 border rounded-md text-sm',
                    currentPage === totalPages
                        ? 'text-gray-400 border-gray-300 pointer-events-none disabled:cursor-not-allowed'
                        : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                )}
                aria-disabled={currentPage === totalPages}
            >
                <ArrowBigRight className="h-4 w-4" />
            </Link>
        </div>
    );
}
