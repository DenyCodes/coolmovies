import { useState } from 'react';
import { useAddReviewMutation } from '../../../generated/graphql';
import { Button, Paper, TextField, Typography } from '@mui/material';

const ReviewForm = () => {
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);

  const [addReview, { loading, error }] = useAddReviewMutation({
    refetchQueries: ['GetReviews'], 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
  variables: {
    input: {
      movieReview: {
        title: "Minha opinião sobre Rogue One", 
        body: "Gostei demais desse filme!",
        rating: 5,
        movieId: "70351289-8756-4101-bf9a-37fc8c7a82cd",      
        userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a"
      }
    }
  }
});




      setBody('');
      setRating(5);
    } catch (err) {
      console.error('Erro ao adicionar review:', err);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6">Add Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Review"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          sx={{ my: 2 }}
        />
        <TextField
          type="number"
          label="Rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          sx={{ my: 2 }}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          Submit
        </Button>
        {error && (
          <Typography color="error" variant="body2">
            {error.message}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default ReviewForm;
