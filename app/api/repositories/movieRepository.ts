import { IMovieRepository } from "@/app/api/interfaces/IMovieRepository";
import { apiInstance } from "@/app/api/axiosInstance";

export class MovieRepository implements IMovieRepository {
    public async getMovies(page: number): Promise<MoviesResult> {
        const response = await apiInstance.get<MoviesResultsDTO>("/discover/movie", {
            params: { page }
        });
        return this.transform(response.data);
    }

    public async searchMovies(query: string, page: number): Promise<MoviesResult> {
        const response = await apiInstance.get<MoviesResultsDTO>("/search/movie", {
            params: { query, page }
        });
        return this.transform(response.data);
    }

    private transform(results: MoviesResultsDTO): MoviesResult {
        const movies = results.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            posterURL: process.env.NEXT_PUBLIC_IMAGE_BASE_PATH + movie.poster_path,
            overview: movie.overview,
            releaseDate: movie.release_date,
            originalLanguage: movie.original_language,
            voteAverage: movie.vote_average
        }));

        const paging: Paging = {
            currentPage: results.page,
            totalPages: results.total_pages
        }

        return { movies: movies, paging: paging }
    }
}
