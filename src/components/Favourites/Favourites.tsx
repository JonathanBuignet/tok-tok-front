import { useEffect } from 'react';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';
import { Box, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import no_bookmarks from '../../fakedata/no_bookmarks.png';
import { fetchFavourites } from '../../store/reducers/adverts';
import AdvertCard from '../Adverts/AdvertCard/AdvertCard';
import WhiteBar from './WhiteBar/WhiteBar';

export default function Favourites() {
  const favourites = useAppSelector((state) => state.adverts.favourites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  const estPaire = favourites.length % 2 === 0;
  const justifyContent = estPaire ? 'space-between' : 'flex-start';
  const gap = estPaire ? '2rem' : '3.2rem';

  const favouritesList = favourites.map((e) => {
    return <AdvertCard key={e.id} {...e} />;
  });

  return (
    <Box
      className="favourite-container"
      sx={{
        height: '100vh',
        width: '82rem',
        position: 'relative',
        padding: '11rem 0rem',
        margin: '0rem auto 18rem auto',
      }}
    >
      <WhiteBar name="Favoris" />
      <Box
        className="cards-container"
        width="100%"
        sx={{
          my: '2rem',
          borderRadius: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: { gap },
          justifyContent: { justifyContent },
        }}
      >
        {favouritesList.length === 0 ? (
          <Stack
            direction="column"
            padding="3rem"
            sx={{
              backgroundColor: 'white',
              borderRadius: '2rem',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.8rem',
                fontFamily: 'DM Sans',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
                p: '1rem',
              }}
            >
              Vous navez pas encore de favoris ? <br />
              Cliquez sur cette icône{' '}
              <BookmarkBorderSharpIcon style={{ fontSize: '2rem' }} /> en haut à
              droite d&apos;une annonce pour qu&apos;elle apparaisse ici.
              <img
                width="200rem"
                src={no_bookmarks}
                alt="no bookmarks"
                style={{ margin: 'auto', padding: '2rem' }}
              />
            </Typography>
          </Stack>
        ) : (
          favouritesList
        )}
      </Box>
    </Box>
  );
}
