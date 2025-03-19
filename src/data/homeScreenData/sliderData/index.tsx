import {ImageSourcePropType} from 'react-native';
import Images from '@utils/images'; 
import { appColors } from '@src/themes'; 

export const sliderData: Array<{
  id: number;
  img: ImageSourcePropType;
  color: string;
}> = [
  {
    id: 0,
    img: Images.homeBanner,
    color: appColors.sliderColor,
  },
  {
    id: 1,
    img: Images.homeBannerTwo,
    color: appColors.whiteColor,
  },
];
