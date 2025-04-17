export interface IMovieRepository {
    getMovies(page: number): Promise<MoviesResult>
    searchMovies(query: string, page: number): Promise<MoviesResult>
}