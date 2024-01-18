import { useState, ChangeEvent, FormEvent } from 'react';
import { IconButton, InputBase, Stack } from '@mui/material';
import send from '../../../assets/icons/paper_plane.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchMessages, sendMessage } from '../../../store/reducers/messagerie';

import './Form.scss';

interface FormProps {
  destinataireId: number;
}

function Form({ destinataireId }: FormProps) {
  const [currentMessage, setCurrentMessage] = useState('');

  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (currentMessage.trim()) {
      dispatch(sendMessage(formData));
      setCurrentMessage('');
      setTimeout(async () => {
        await dispatch(fetchMessages(destinataireId));
      }, 500);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Stack
        direction="row"
        sx={{
          width: '100%',
          borderRadius: '5rem',
          backgroundColor: '#F5F6FA',
          display: 'flex',
        }}
      >
        <InputBase
          name="content"
          multiline
          maxRows={4}
          fullWidth
          value={currentMessage}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleChange}
          sx={{
            fontFamily: 'DM Sans',
            ml: '2rem',
            p: '1.5rem',
            flex: 0.98,
            fontSize: '1.5rem',
            backgroundColor: '#F5F6FA',
            borderRadius: '9.5rem',
            color: '#888888',
            border: 'none',
            '& fieldset': { border: 'none' },
          }}
          placeholder="Saisissez votre message…"
          inputProps={{
            'aria-label': 'Champ de messagerie',
          }}
        />

        <IconButton
          type="submit"
          sx={{
            my: 'auto',
            maxHeight: '5.2rem',
            p: '0.1rem',
            borderRadius: '5rem',
            backgroundColor: 'primary.dark',
            '&:hover': {
              bgcolor: 'primary.light',
            },
            '&:active': {
              bgcolor: 'primary',
            },
          }}
        >
          <img alt="Send" src={send} style={{ padding: '1rem' }} />
        </IconButton>
      </Stack>
      <input
        type="text"
        className="form-input"
        name="destinataire"
        value={destinataireId}
        readOnly
        hidden
      />
    </form>
  );
}

export default Form;
