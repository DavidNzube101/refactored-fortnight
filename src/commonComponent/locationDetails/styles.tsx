import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight} from '@src/themes';
import {commonStyles} from '../../styles/commonStyle';
import { appColors } from '@src/themes'; 
import {external} from '../../styles/externalStyle';

const styles = StyleSheet.create({
  itemStyle: {
    ...commonStyles.regularText,
    fontWeight: '100',
    fontSize: fontSizes.FONT16,
    color: appColors.primaryText,
  },
  dashedLine: {
    height: 0.1,
    width: '100%',
    borderWidth: windowHeight(0.4),
    borderColor: appColors.primaryGray,
    borderStyle: 'dashed',
    marginVertical: windowHeight(8),
  },
  pickUpLocationStyles: {
    ...commonStyles.regularText,
    fontWeight: '300',
    fontSize: fontSizes.FONT16,
    color: appColors.primaryText,
  },
  addressContainer: {
    ...commonStyles.shadowContainer,
    borderRadius: windowHeight(6),
    overflow: 'hidden',
    position: 'relative',
    ...external.fd_row,
    paddingVertical: windowHeight(4),
  },
  icon: {
    borderStyle: 'dotted',
    height: windowHeight(20),
    borderLeftWidth: windowHeight(0.9),
    marginHorizontal: windowHeight(5),
    borderLeftColor: appColors.regularText,
  },
});
export {styles};
