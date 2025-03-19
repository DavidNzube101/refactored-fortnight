import { ImageSourcePropType } from 'react-native';
import Images from '@utils/images'; 
import { RootStackParamList } from '../../../navigation/types';
export const topCategory: Array<{
  id: number;
  title: string;
  img: ImageSourcePropType;
  screenName: keyof RootStackParamList;
}> = [
    {
      id: 0,
      title: 'home.ride',
      img: Images.rideLogo,
      screenName: 'LocationDrop',
    },

    {
      id: 1,
      title: 'home.outstation',
      img: Images.outstationLogo,
      screenName: 'OutStation',
    },
    {
      id: 2,
      title: 'home.rental',
      img: Images.rentalLogo,
      screenName: 'SelectRide',
    },
    {
      id: 3,
      title: 'Schedule',
      img: Images.scheduledLogo,
      screenName: 'LocationDrop',
    },
  ];
