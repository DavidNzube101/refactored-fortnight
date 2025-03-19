import Images from '@utils/images'; 
import { useSelector } from 'react-redux';

export const useSlides = () => {

const { translateData } = useSelector((state) => state.setting);

return [
  {
    id: 0,
    image: Images.destination,
    imagesDark: Images.destinationDark,
    text: translateData.title1,
  },
  {
    id: 1,
    image: Images.trip,
    imagesDark: Images.tripDark,
    text: translateData.title2,
  },
  {
    id: 2,
    image: Images.bookRide,
    imagesDark: Images.bookRideDark,
    text: translateData.title3,
  },
];
}
