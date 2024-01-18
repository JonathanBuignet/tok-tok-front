import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import FormField from '../../Accueil/FormField/FormField';
import axiosInstance from '../../../utils/axios';
import ImageUploader from '../../ImageUploader/ImageUploader';

interface EditAdvertModalProps {
  id: number;
  // title: string;
}

export default function EditAdvertModalForm({
  id,
}: // title,
EditAdvertModalProps) {
  const [categorie, setCategorie] = useState('');
  const advert = useAppSelector((state) => state.adverts);
  const [categorieList, setCategorieList] = useState([]);

  const handleChangeCategories = (event: SelectChangeEvent) => {
    setCategorie(event.target.value);
  };

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

  return (
    <Stack
      direction="column"
      justifyContent="center"
      className="edit-modal-form"
    >
      {/* Titre */}
      <Typography id="modal-modal-title" fontSize="1.6rem">
        Editer l&apos;annonce &quot;{advert.advert.title}&quot;{' '}
        {/* {advert.list[0].title} */}
      </Typography>
      {/* Champ Titre */}
      <FormField
        data-id={id}
        name="title"
        label="Titre"
        type="text"
        autoComplete="none"
        // placeholder={title}
      />
      {/* Selecteur de catégories */}
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
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {categorieList.map((cat: any) => {
            return (
              <MenuItem key={cat.name} value={cat.id}>
                {cat.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* Champ contenu */}
      <FormField
        name="content"
        label="Description"
        type="text"
        autoComplete="none"
        multiline
        rows={8}
        placeholder={advert.advert.content}
      />
      {/* Bouton ajout d'image */}
      <ImageUploader />
      {/* prix */}
      <FormField
        name="price"
        label="Prix"
        type="number"
        min="0"
        autoComplete="none"
        InputProps={{
          endAdornment: <InputAdornment position="start">€</InputAdornment>,
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
          boxShadow: 0,
        }}
      >
        Enregister les modifications
      </Button>
    </Stack>
  );
}
