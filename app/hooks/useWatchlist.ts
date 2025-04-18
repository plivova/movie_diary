import { useEffect, useState } from "react";

export function useWatchlist() {
    const [watchListMovies, setWatchListMovies] = useState<Movie[]>([]);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("watchlist");
        if (stored) {
            setWatchListMovies(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage when watchListMovies changes
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchListMovies));
    }, [watchListMovies]);

    // Checks if any movie in the list has the same id as the one passed in.
    const isInWatchlist = (movie: Movie) => {
        return watchListMovies.some((m) => m.id === movie.id);
    };

    // If the movie is already in the list, it removes it. If the movie is not in the list, it adds it.
    const toggleWatchlist = (movie: Movie) => {
        // Update the state using the previous state value
        setWatchListMovies((prev) => {
            if (isInWatchlist(movie)) {
                return prev.filter((m) => m.id !== movie.id);
            } else {
                // Spread operator to keep existing movies and append the new one
                return [...prev, movie];
            }
        });
    };

    return { watchListMovies, toggleWatchlist, isInWatchlist };
}