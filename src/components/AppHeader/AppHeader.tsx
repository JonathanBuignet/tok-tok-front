import { Box, Stack } from '@mui/material';
import UserHeader from './UserHeader/UserHeader';
import LogoHeader from './LogoHeader/LogoHeader';
import IconButton from '@mui/material/IconButton';
import NotificationHeader from './Notifications/NotificationHeader';
import SearchBar from './SearchBar/SearchBar';
import search from '../../assets/icons/search.svg';

export default function AppHeader() {
  return (
    <Box
      className="app-header"
      sx={{
        backgroundColor: 'white',
        height: '10rem',
        py: '3rem',
        px: '10rem',
        position: 'fixed',
        width: 1,
        zIndex: 1000,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <LogoHeader />
        {/* <SearchBar /> */}
        <Stack direction="row" alignItems="center">
          {/* <IconButton
            className="searchbar-icon"
            sx={{ m: '0px 0px 0px 10px' }}
            aria-label="search"
          >
            <img alt="searchbar icon" src={search} height={25} width={25} />
          </IconButton>
          <NotificationHeader /> */}
          <UserHeader />
        </Stack>
      </Stack>
    </Box>
  );
}
