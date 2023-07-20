import {
  Badge,
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import bookmark from '../../assets/icons/bookmark.svg';
import conversation from '../../assets/icons/conversation.svg';
import home from '../../assets/icons/home.svg';
import megaphone from '../../assets/icons/megaphone.svg';
import profile from '../../assets/icons/profile.svg';

export default function Menu() {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: '100%',
        borderRadius: 4,
        backgroundColor: '#FFF',
        position: 'fixed',
        top: 250,
        left: '10rem',
      }}
    >
      <MenuList sx={{ gap: '2rem' }}>
        <MenuItem
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2rem',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {/* Faudra mettre un classe isActive sur les boutons qui sont actifs */}
          <ListItemIcon sx={{ p: 1.2, borderRadius: 3 }}>
            {/* <NavLink to="/home"> */}
            <IconButton
              component={NavLink}
              to="/home"
              type="button"
              aria-label="paramètres"
              sx={{
                '&:active': {
                  BackgroundColor: '#F07DEA !important',
                },
              }}
            >
              <img alt="search icon" src={home} />
            </IconButton>
            {/* </NavLink> */}
          </ListItemIcon>
          <ListItemIcon sx={{ p: 1 }}>
            <NavLink to="/profil">
              <IconButton type="button" aria-label="paramètres">
                <img alt="search icon" src={profile} />
              </IconButton>
            </NavLink>
          </ListItemIcon>
          <ListItemIcon sx={{ p: 1 }}>
            <NavLink to="/annonces">
              <IconButton type="button" aria-label="paramètres">
                <img alt="search icon" src={megaphone} />
              </IconButton>
            </NavLink>
          </ListItemIcon>
          <ListItemIcon sx={{ p: 1 }}>
            <NavLink to="/favoris">
              <IconButton type="button" aria-label="paramètres">
                <img alt="search icon" src={bookmark} />
              </IconButton>
            </NavLink>
          </ListItemIcon>
          <ListItemIcon sx={{ p: 1 }}>
            <NavLink to="/messagerie">
              {' '}
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    color: 'WHITE',
                    fontSize: '1.15rem',
                  },
                }}
                badgeContent={5477}
                color="primary"
              >
                <IconButton type="button" aria-label="paramètres">
                  <img alt="search icon" src={conversation} />
                </IconButton>
              </Badge>
            </NavLink>
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
