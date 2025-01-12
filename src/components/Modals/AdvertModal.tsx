import { useEffect, useState, FormEvent } from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../hooks/redux';
import { addAdvert, fetchAdverts } from '../../store/reducers/adverts';
import AddAdvertField from './AddAdvertField/AddAdvertField';
import axiosInstance from '../../utils/axios';
import ImageUploader from '../ImageUploader/ImageUploader';

import '../App/style.scss';

export default function AdvertModal() {
  const [open, setOpen] = useState(false);
  const [categorie, setCategorie] = useState('');
  const [categorieList, setCategorieList] = useState([]);

  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const { data } = await axiosInstance.get('/categories');
        setCategorieList(data);
      };
      fetchCategories();
    } catch (error) {
      // console.error(error);
    }
  }, []);

  const handleChangeCategories = (event: SelectChangeEvent) => {
    setCategorie(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    dispatch(addAdvert(formData));

    setTimeout(async () => {
      await dispatch(fetchAdverts());
      setOpen(false);
      setCategorie('');
    }, 800);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
          color: '#fff',
          fontSize: '1.5rem',
          borderRadius: '2rem',
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 'normal',
          p: '1rem 1.2rem',
          height: '7rem',
          border: '0px',
        }}
      >
        <Typography className="ajouter-text" fontSize="1.5rem">
          Créer une Annonce
        </Typography>
        <Typography className="ajouter-plus" fontSize="1.6rem">
          +
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="create-advert-modal-container"
          sx={{
            backgroundColor: 'transparent',
            margin: 'auto',
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              width: '100%',
              m: 'auto',
              p: '5rem',
              borderRadius: '2rem',
            }}
          >
            {/* Titre */}
            <Typography id="modal-modal-title" fontSize="1.6rem">
              Créer une nouvelle annonce
            </Typography>
            {/* Champ Titre */}
            <AddAdvertField
              name="title"
              label="Titre"
              type="text"
              autoComplete="none"
            />
            {/* catégories */}
            <FormControl
              sx={{
                width: '100%',
                backgroundColor: '#FFF',
              }}
              size="medium"
            >
              <InputLabel id="select-categorie">Catégories</InputLabel>
              <Select
                labelId="select-categorie"
                name="tag_id"
                id="select-categorie"
                value={categorie}
                label="Catégories"
                onChange={handleChangeCategories}
                input={<OutlinedInput />}
                inputProps={{ 'aria-label': 'Without label' }}
                required
              >
                {categorieList.map((cat: any) => {
                  return (
                    <MenuItem key={cat.name} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* Champ description */}
            <AddAdvertField
              name="content"
              label="Description"
              type="text"
              autoComplete="none"
              multiline
              rows={8}
            />
            {/* Bouton ajout d'image */}
            <ImageUploader />
            {/* prix */}
            <AddAdvertField
              className="input-number"
              name="price"
              label="Prix"
              type="number"
              min="0"
              autoComplete="none"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: 'primary.dark',
                color: '#fff',
                textTransform: 'none',
                fontSize: '1.5rem',
                borderRadius: '1.3rem',
                fontFamily: 'DM Sans',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
                mt: '1rem',
                p: '1.2rem',
                alignItems: 'center',
                width: '100%',
                boxShadow: 0,
              }}
            >
              Publier l&apos;annonce
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
