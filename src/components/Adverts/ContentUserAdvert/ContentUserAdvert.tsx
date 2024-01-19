import { Stack } from '@mui/material';
import { Advert } from '../../../@types';
import AdvertCard from '../AdvertCard/AdvertCard';

interface ContentUserAdvertProps {
  userAdverts: Advert[];
}

function ContentUserAdvert({ userAdverts }: ContentUserAdvertProps) {
  const estPaire = userAdverts.length % 2 === 0;
  const gap = estPaire ? '3.2rem' : '2rem';
  return (
    <Stack className="ContentUserAdvert">
      {userAdverts && (
        <Stack
          direction="row"
          justifyContent="flex-start"
          gap={gap}
          flexWrap="wrap"
        >
          {userAdverts.map((advert) => (
            <AdvertCard key={advert.id} {...advert} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default ContentUserAdvert;
