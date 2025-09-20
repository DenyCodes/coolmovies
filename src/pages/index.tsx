import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material';
import { useGetMoviesWithReviewsQuery } from '../generated/graphql';
import MovieCard from '../features/example/templates/MoviesWithReviews';

const HomePage = () => {
  const { data, loading, error } = useGetMoviesWithReviewsQuery();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ color: '#fff' }}
      >
        <Typography variant="h6">Carregando filmes...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ color: 'red' }}
      >
        <Typography variant="h6">Erro: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ background: '#1f1f1f' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}
          >
            🎬 Coolmovies
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 6, pb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#f5f5f5',
              textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
              mb: 1,
            }}
          >
            Catálogo de Filmes
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mx: 'auto' }}
          >
            Confira os filmes e avaliações dos usuários ou adicione a sua opinião.
          </Typography>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {data?.allMovies?.nodes.map(
              (movie) =>
                movie && (
                  <Grid item key={movie.id} xs={12} sm={6} md={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                )
            )}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          py: 3,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} Coolmovies - Desenvolvido como desafio
          técnico
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
