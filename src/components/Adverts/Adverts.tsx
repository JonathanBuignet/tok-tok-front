import { Box, Grid, Paper, Stack } from '@mui/material';
import AppHeader from '../AppHeader/AppHeader';
import Menu from '../Menu/Menu';
import AdvertCard from './Advert/Advert';
import CreateAdvertButton from './CreateAdvertButton/CreateAdvertButton';
import SortBar from './SortBar/SortBar';
import ColorToggleButton from './ToggleButton/ToggleButton';

function Adverts() {
  return (
    <>
      <AppHeader />
      <Menu />

      <Paper
        sx={{
          maxWidth: '30rem',
          p: '1rem',
          position: 'fixed',
          top: '12.5rem',
          left: '23 rem',
        }}
      >
        <ColorToggleButton />
      </Paper>
      <CreateAdvertButton />
      <Stack direction="column">
        <SortBar />
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            left: '8rem',
            top: '20rem',
            overflowY: 'scroll',
          }}
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="10px"
            justifyContent="center"
          >
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
            <AdvertCard />
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default Adverts;
