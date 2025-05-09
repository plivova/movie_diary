// html + css source: https://flowbite.com/docs/forms/search-input/#search-bar-example

"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Handling search using debounce
    // (limits the rate at which a function can fire, not sending a new request to the database on each keystroke)
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="searchBar">
            <form className="max-w-md mx-auto m-8">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border
                           border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                           focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                           dark:focus:border-blue-500"
                           placeholder={placeholder} required
                           onChange={(e) => {
                               handleSearch(e.target.value);
                           }}
                           // To ensure the input field is in sync with the URL and will be populated when sharing
                           defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
            </form>
        </div>
    )
}