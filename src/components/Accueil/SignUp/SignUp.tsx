import {
  Alert,
  Box,
  Button,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  useEffect,
  useState,
  MouseEvent,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signup } from '../../../store/reducers/user';
import FormField from '../FormField/FormField';

interface AddressProps {
  properties: {
    label: string;
    city: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export default function SignUp() {
  const errorMessage = useAppSelector((state) => state.user.error);
  const [addressValue, setAddressValue] = useState('');
  const [addressProps, setAddressProps] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchAddress() {
      try {
        const { data } = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${addressValue}&limit=5&autocomplete=0`
        );
        setAddressProps(data.features);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    fetchAddress();
  }, [addressValue]);

  const addressPropsList = addressProps.map((e: AddressProps) => {
    const handleClickAddressItem = (
      event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
    ) => {
      const target = event.currentTarget;
      setLatitude(target.dataset.latitude || '');
      setLongitude(target.dataset.longitude || '');
      setCity(target.dataset.city || '');
      setAddressValue(target.dataset.address || '');
      setIsEmpty(false);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        handleClickAddressItem(event);
      }
    };
    return (
      <ListItemButton key={e.properties.label}>
        <div
          role="button"
          onClick={handleClickAddressItem}
          onKeyUp={handleKeyPress}
          onKeyDown={handleKeyPress}
          data-latitude={e.geometry.coordinates[1]}
          data-longitude={e.geometry.coordinates[0]}
          data-city={e.properties.city}
          data-address={e.properties.label}
          tabIndex={0}
        >
          <ListItemText primary={e.properties.label} />
        </div>
      </ListItemButton>
    );
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    dispatch(signup(formData));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
    if (event.target.value.length === 0) {
      setIsEmpty(true);
      setAddressProps([]);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <FormField
        name="firstname"
        label="Prénom"
        type="text"
        autoComplete="family-name"
        required
      />
      <FormField
        name="lastname"
        label="Nom"
        type="text"
        autoComplete="given-name"
        required
      />
      <FormField
        name="address"
        label="Adresse"
        type="text"
        autoComplete="none"
        value={addressValue}
        onChange={handleChange}
        required
      />

      {isEmpty && addressPropsList}

      {/* ---------- input = champs cachés ---------- */}
      <input
        type="text"
        name="city"
        aria-label="city"
        value={city}
        hidden
        readOnly
      />
      <input
        type="text"
        name="latitude"
        aria-label="latitude"
        value={latitude}
        hidden
        readOnly
      />
      <input
        type="text"
        name="longitude"
        aria-label="longitude"
        value={longitude}
        hidden
        readOnly
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      <FormField
        name="password"
        label="Mot de passe"
        type="password"
        autoComplete="off"
        required
      />
      <FormField
        name="confirmation"
        label="Confirmation de mot de passe"
        type="password"
        autoComplete="off"
        required
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, color: 'white', fontSize: '1.3rem' }}
      >
        S&apos;inscrire
      </Button>
    </Box>
  );
}
