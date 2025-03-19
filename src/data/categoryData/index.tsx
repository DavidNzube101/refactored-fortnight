import { ImageSourcePropType } from 'react-native';
import Images from '@utils/images'; 
import { RootStackParamList } from '../../navigation/types';

export const categoryData: Array<{
  id: number;
  img: ImageSourcePropType;
  title: string;
  subtitle: string;
  screenName: keyof RootStackParamList;
}> = [
    {
      id: 0,
      img: Images.rideBg,
      title: 'category.ride',
      subtitle: 'Used for intercity traveling',
      screenName: 'LocationDrop',
    },
    {
      id: 1,
      img: Images.outStation,
      title: 'category.outstation',
      subtitle: 'Used for travel city to city',
      screenName: 'OutStation',
    },
    {
      id: 2,
      img: Images.rental,
      title: 'category.rental',
      subtitle: 'Used for get vehicle on rent',
      screenName: 'SelectRide',
    },
    {
      id: 3,
      img: Images.scheduled,
      title: 'Scheduled',
      subtitle: 'Used for get vehicle on rent',
      screenName: 'ScheduleRideScreen',
    },
  ];
