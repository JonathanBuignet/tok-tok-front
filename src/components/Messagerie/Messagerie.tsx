import { KeyboardEvent, useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchContacts } from '../../store/reducers/messagerie';
import Form from './Form/Form';
import MenuContact from './MenuContact/MenuContact';
import Messages from './Messages/Messages';

import '../App/style.scss';
import WhiteBar from '../Favourites/WhiteBar/WhiteBar';

export default function Messagerie() {
  const [destinataireId, setDestinataireId] = useState(0);
  const [destinataireName, setDestinataireName] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.messagerie.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Stack
      className="messages-container"
      sx={{
        height: '85vh',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '11rem',
        gap: '2rem',
      }}
    >
      <WhiteBar name="Messagerie" />
      {contacts.length > 0 ? (
        // L'esenmble des blocs
        <Stack
          direction="row"
          height="100%"
          width="100%"
          gap="1rem"
          marginBottom="2rem"
        >
          {/* Liste de contacts */}
          <Stack
            style={{
              backgroundColor: 'white',
              padding: '1.2rem',
              width: isOpen ? '30%' : '10%',
              borderRadius: '2rem',
            }}
            className={isOpen ? 'messages-contacts--open' : 'messages-contacts'}
          >
            {/* bouton toggle liste */}
            <button
              type="button"
              style={{
                display: 'flex',
                backgroundColor: 'transparent',
                border: '0px',
              }}
              onClick={() => setIsOpen(!isOpen)}
              onKeyUp={handleKeyPress}
              onKeyDown={handleKeyPress}
            >
              <Icon
                className={
                  !isOpen
                    ? 'open-contact-button'
                    : 'open-contact-button--is-open'
                }
                icon="solar:alt-arrow-right-line-duotone"
                color="#03665C"
                fontSize="42px"
              />
            </button>
            {/* List des contacts */}
            <Stack
              style={
                isOpen
                  ? {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem',
                      width: '100%',
                      height: '100%',
                      padding: '1rem',
                      alignItems: 'center',
                    }
                  : { display: 'none' }
              }
            >
              <MenuContact
                contacts={contacts}
                destinataireId={destinataireId}
                setDestinataireId={setDestinataireId}
                destinataireName={destinataireName}
                setDestinataireName={setDestinataireName}
              />
            </Stack>
          </Stack>
          {/* Panneau global de droite */}
          <Stack
            direction="column"
            gap="1rem"
            height="100%"
            className={isOpen ? 'messages-content--close' : 'messages-content'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: isOpen ? '70%' : '90%',
              height: '100%',
            }}
          >
            {/* Barre destinataire */}
            <Stack
              direction="row"
              sx={{
                backgroundColor: '#fff',
                p: '1rem',
                px: '2rem',
                borderRadius: '2rem',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '10%',
              }}
            >
              {/* Destinataire typo */}
              <Typography
                sx={{
                  color: '#000',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '2rem',
                  fontFamily: 'DM Sans',
                }}
              >
                Message de :
              </Typography>
              <Typography
                sx={{
                  color: 'primary.dark',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '2rem',
                  fontFamily: 'DM Sans',
                }}
              >
                {destinataireName}
              </Typography>
            </Stack>
            {/* Messages */}
            <Stack
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                p: '2rem',
                borderRadius: '2rem',
                height: 'calc(90% - 1rem)',
                backgroundColor: '#fff',
              }}
            >
              <Messages />
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Form destinataireId={destinataireId} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        /* Composant quand pas de messages */
        <Box
          width="100%"
          sx={{
            my: '2rem',
            borderRadius: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'flex-start',
            backgroundColor: 'white',
            padding: '3rem',
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
            Vous navez pas encore de messages ? <br />
            Cliquez sur le bouton &quot;contacter le vendeur&quot; dans une
            annonce pour que vos différentes conversations s&apos;affichent ici.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
