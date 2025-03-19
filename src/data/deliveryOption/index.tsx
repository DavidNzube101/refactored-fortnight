import {ImageSourcePropType} from 'react-native';
import Images from '@utils/images'; 

export const selectOption: Array<{
  id: number;
  title: string;
  img: ImageSourcePropType;
}> = [
  {
    id: 0,
    title: 'Shared Ride',
    img: Images.taxi,
  },
  {
    id: 1,
    title: 'Parcel',
    img: Images.parcel,
  },
  {
    id: 2,
    title: 'Freight',
    img: Images.freight,
  },
];
