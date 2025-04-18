import Image from 'next/image';
import { Film, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

type MovieCardProps = {
    movie: Movie;
    toggleWatchlist: (movie: Movie) => void;
    isInWatchlist: (movie: Movie) => boolean;
};

export function MovieCard({ movie, toggleWatchlist, isInWatchlist }: MovieCardProps) {
    const handleAddToWatchlist = () => {
        toggleWatchlist(movie);
        const message = isInWatchlist(movie)
            ? "Removed from watchlist 🎞️"
            : "Added to watchlist! 🎥";
        toast.success(message);
    };

    const handleAddToDiary = () => {
        // TODO: Save to localStorage
        console.log("Add to diary:", movie);
    };

    const inWatchlist = isInWatchlist(movie);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-60">
            <Image
                src={movie.posterURL}
                alt={movie.title}
                width={240}
                height={360}
                className="w-full h-80 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{movie.title}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        ⭐ {movie.voteAverage} · {movie.releaseDate}
                    </p>

                    {/*Buttons handling adding movies to watchlist and logging movies to the diary */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToWatchlist}
                            className={`hover:text-indigo-500 ${inWatchlist ? "text-indigo-500" : "text-gray-400"}`}
                            title="Add to Watchlist"
                        >
                            <Film className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleAddToDiary}
                            className="hover:text-red-500"
                            title="Add to Diary"
                        >
                            <Heart className="w-5 h-5" />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

