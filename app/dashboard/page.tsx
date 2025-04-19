"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MovieRepository } from "@/app/api/repositories/movieRepository";
import { MovieCard } from "@/app/components/movieCard";
import { SearchBar } from "@/app/components/searchBar";
import { Pagination } from "@/app/components/pagination";
import { useWatchlist } from "@/app/hooks/useWatchlist";
import {useDiary} from "@/app/hooks/useDiary";

export default function DashboardPage() {
    const [results, setResults] = useState<MoviesResult>({ movies: [], paging: { currentPage: 1, totalPages: 0 }});
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const currentPage = Number(searchParams.get('page')) || 1;

    const { toggleWatchlist, isInWatchlist } = useWatchlist();
    const { toggleDiary, isInDiary } = useDiary();

    useEffect(() => {
        const fetchMovies = async () => {
            const movieRepository = new MovieRepository();
            try {
                const response = query
                    ? await movieRepository.searchMovies(query, currentPage)
                    : await movieRepository.getMovies(currentPage);
                setResults(response);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [query, currentPage]);

    return (
        <div>
            <SearchBar placeholder="Search movies..." />
            <div className="grid items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {results.movies.length > 0 ? (
                        results.movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                toggleWatchlist={toggleWatchlist} // Each card can add or remove itself from the watchlist
                                isInWatchlist={isInWatchlist} // Each card knows if its movie is in the watchlist
                                toggleDiary={toggleDiary}
                                isInDiary={isInDiary}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">
                            No movies found
                        </p>
                    )}
                </div>
            </div>
            <Pagination totalPages={results.paging.totalPages} currentPage={currentPage} />
        </div>
    );
}
