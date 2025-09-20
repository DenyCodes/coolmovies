import { useState } from 'react';
import { useAddReviewMutation, useGetUsersQuery } from '../../../generated/graphql';
import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

type ReviewFormProps = {
  movieId: string;
};

const ReviewForm = ({ movieId }: ReviewFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('');

  const { data: usersData, loading: loadingUsers } = useGetUsersQuery();

  const [addReview, { loading, error }] = useAddReviewMutation({
    refetchQueries: ['GetMoviesWithReviews'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReview({
      variables: {
        input: {
          movieReview: { title, body, rating, movieId, userReviewerId: userId },
        },
      },
    });
    setTitle('');
    setBody('');
    setRating(5);
    setUserId('');
  };

  return (
    <Paper
      sx={{
        p: 2,
        mt: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
      elevation={0}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Adicionar Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          fullWidth
          label="Comentário"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          type="number"
          label="Nota (0-5)"
          inputProps={{ min: 0, max: 5 }}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          sx={{ my: 1 }}
        />

        <Select
          fullWidth
          displayEmpty
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ my: 1 }}
        >
          <MenuItem value="" disabled>
            {loadingUsers ? 'Carregando usuários...' : 'Selecione um usuário'}
          </MenuItem>
          {usersData?.allUsers?.nodes.map(
            (user) =>
              user && (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              )
          )}
        </Select>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#1976d2' }}
          disabled={loading || !userId}
        >
          Enviar
        </Button>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error.message}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default ReviewForm;
