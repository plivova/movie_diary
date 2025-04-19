"use client";

import React from "react";
import { MovieCard } from "@/app/components/movieCard";
import { useWatchlist } from "@/app/hooks/useWatchlist";
import { useDiary } from "@/app/hooks/useDiary";

export default function WatchlistPage() {
    const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();
    const { toggleDiary, isInDiary } = useDiary();

    return (
        <div className="p-8">
            {watchlist.length === 0 ? (
                <p className="text-center text-gray-500">Your watchlist is empty. Add movies you want to watch! 🎥</p>
            ) : (
                <div className="grid items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {watchlist.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleWatchlist={toggleWatchlist}
                            isInWatchlist={isInWatchlist}
                            toggleDiary={toggleDiary}
                            isInDiary={isInDiary}
                        />
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}
