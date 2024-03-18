import { Movie } from '@/lib/types';
import MovieCard from './MovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

  return (
    <div className="category">
      <h1 className="category-title">{title}</h1>
      <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
