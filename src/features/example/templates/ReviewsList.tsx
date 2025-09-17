import { useGetReviewsQuery } from '../../../generated/graphql';
import { Paper, Typography, CircularProgress, List, ListItem } from '@mui/material';

const ReviewsList = () => {
  const { data, loading, error } = useGetReviewsQuery();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h5">Reviews</Typography>
      <List>
        {data?.allReviews?.nodes.map((review) => (
          <ListItem key={review.id}>
            <strong>{review.movie.title}</strong>: {review.body} ⭐ {review.rating}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ReviewsList;
