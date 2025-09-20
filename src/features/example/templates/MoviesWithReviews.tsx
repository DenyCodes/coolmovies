import { Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';
import ReviewForm from './ReviewForm';

type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    imgUrl?: string | null;
    movieReviewsByMovieId: {
      nodes: {
        id: string;
        title: string;
        body: string;
        rating: number;
        userByUserReviewerId?: { id: string; name: string } | null;
      }[];
    };
  };
};

const MoviesWithReviews = ({ movie }: MovieCardProps) => {
  return (
    <Card
      sx={{
        width: 350,
        borderRadius: 3,
        backgroundColor: '#fff',
        boxShadow: 4,
      }}
    >
      {movie.imgUrl && (
        <CardMedia
          component="img"
          height="180"
          image={movie.imgUrl}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {movie.title}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Reviews:
        </Typography>
        {movie.movieReviewsByMovieId.nodes.length > 0 ? (
          movie.movieReviewsByMovieId.nodes.map((review) => (
            <Typography key={review.id} variant="body2" sx={{ mb: 1 }}>
              <strong>{review.userByUserReviewerId?.name ?? 'Usuário'}</strong>: {review.body}{' '}
              ⭐ {review.rating}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhum review ainda.
          </Typography>
        )}

        <ReviewForm movieId={movie.id} />
      </CardContent>
    </Card>
  );
};


export default MoviesWithReviews;
