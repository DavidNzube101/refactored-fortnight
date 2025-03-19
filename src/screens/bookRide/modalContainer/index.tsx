import { Image, Text, View } from 'react-native';
import React from 'react';
import { styles } from '../styles';
import { external } from '../../../styles/externalStyle';
import { commonStyles } from '../../../styles/commonStyle';
import { appColors } from '@src/themes';
import { SolidLine, Button } from '@src/commonComponent';
import { modalItemType } from './types';
import { useValues } from '../../../../App';
import { Clock, UserFill } from '@utils/icons'
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export function ModalContainers({ onPress, selectedItemData }: modalItemType) {
  const { viewRTLStyle, textRTLStyle, textColorStyle, bgContainer,currPrice, currSymbol, isDark } = useValues();
  const { colors } = useTheme()
  const { translateData } = useSelector((state) => state.setting);

  return (
    <View>
      <View style={{ backgroundColor: bgContainer }} >
        <View style={[styles.modalTitle, { flexDirection: viewRTLStyle, }]}>
          <View style={{ flexDirection: viewRTLStyle }}>
            <Text style={{ color: isDark ? appColors.whiteColor : appColors.primaryText }}>{selectedItemData?.name}</Text>
            <View style={[styles.verticalLine, { borderRightColor: colors.border }]} />
            <UserFill />
            <Text style={{ color: appColors.primaryText }}>{selectedItemData?.capacity}</Text>
          </View>
          <View style={{ flexDirection: viewRTLStyle }}>
            <Text style={styles.price}>{currSymbol}{currPrice * 50}</Text>
            <Text style={styles.priceCut}>{currSymbol}{currPrice * 56}</Text>
          </View>
        </View>
        <View style={styles.solidLine}>
          <SolidLine />
        </View>
        <Image style={styles.carTwo} source={{ uri: selectedItemData?.vehicle_image.original_url }} />
        <View>
          <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
            <View style={[{ flexDirection: viewRTLStyle }]}>
              <View style={styles.clock}>
                <Clock color={isDark ? appColors.whiteColor : appColors.primaryText} />
              </View>
              <Text style={[styles.fiveMinAway, { color: textColorStyle }]}>{translateData.time}</Text>
            </View>
            <Text style={[styles.fourPmText, { color: textColorStyle }]}>{'\u2022'} 4:00PM</Text>
          </View>
          <Text style={[commonStyles.regularText, { textAlign: textRTLStyle }]}>
            {translateData.subTitle}
          </Text>
          <View style={styles.solidLine}>
            <SolidLine />
          </View>
          <Text style={[styles.termsText, { color: textColorStyle, textAlign: textRTLStyle }]}>{translateData.terms}</Text>
          <View>
            <Text style={[commonStyles.regularText, external.mb_15, { textAlign: textRTLStyle }]}>
              {'\u2022'} A cancellation charge of {currSymbol}{currPrice * selectedItemData?.cancellation_charge} will be deducted if you cancel your ride.
            </Text>
            <Text style={[commonStyles.regularText, external.mb_15, { textAlign: textRTLStyle }]}>
              {'\u2022'} If you do not arrive within the waiting time limit of {selectedItemData?.waiting_time_limit} minutes, the driver may be forced to cancel the ride.
            </Text>
          </View>
        </View>
        <View style={[external.mv_10]}>
          <Button title={translateData.done} onPress={onPress} />
        </View>
      </View>
    </View >
  );
};
