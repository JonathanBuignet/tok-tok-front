import { Stack } from '@mui/material';
import { Advert } from '../../../@types';
import AdvertCard from '../AdvertCard/AdvertCard';
import { useAppSelector } from '../../../hooks/redux';

interface ContentAdvertProps {
  adverts: Advert[];
  context: string;
}

function ContentAdvert({ adverts, context }: ContentAdvertProps) {
  const advertsList = useAppSelector((state) => state.adverts.list);
  const estPaire = advertsList.length % 2 === 0;
  const justifyContent = estPaire ? 'flex-start' : 'space-between';
  const gap = estPaire ? '3.2rem' : '2rem';
  return (
    <div>
      {adverts && (
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent={justifyContent}
          gap={gap}
        >
          {adverts.map((advert) => (
            <AdvertCard key={advert.id} context={context} {...advert} />
          ))}
        </Stack>
      )}
    </div>
  );
}

export default ContentAdvert;
