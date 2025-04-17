"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MovieRepository } from "@/app/api/repositories/movieRepository";
import { MovieCard } from "@/app/components/movieCard";
import { SearchBar } from "@/app/components/searchBar";
import { Pagination } from "@/app/components/pagination";

export default function Home() {
    const [results, setResults] = useState<MoviesResult>({ movies: [], paging: { currentPage: 1, totalPages: 0 }});
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const currentPage = Number(searchParams.get('page')) || 1;

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
                            <MovieCard key={movie.id} movie={movie} />
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
