import Image from 'next/image';

export function MovieCard({ movie }: { movie: Movie }) {
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    ⭐ {movie.voteAverage} · {movie.releaseDate}
                </p>
            </div>
        </div>
    );
}

