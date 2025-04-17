interface MoviesResult {
    movies: Movie[];
    paging: Paging;
}

interface Movie {
    id: number;
    title: string;
    posterURL: string;
    overview: string;
    releaseDate: string;
    originalLanguage: string;
    voteAverage: number
}