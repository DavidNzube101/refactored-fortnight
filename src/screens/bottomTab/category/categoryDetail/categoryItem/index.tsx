import { ImageBackground, Pressable, Text, View } from 'react-native';
import React from 'react';
import { styles } from '../style';
import { external } from '../../../../../styles/externalStyle';
import { appColors } from '@src/themes'; 
import { RightArrow } from '@utils/icons';
import { useValues } from '../../../../../../App';

export function CategoryItem ({ item, onPress }) {
  const { t } = useValues();
  return (
    <View>
      <Pressable onPress={onPress}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.imgBg}
          source={{uri:item.service_image.original_url}}>
          <View style={[external.mt_10, external.mh_20]}>
            <Text style={[styles.readyText]}>{item.name}</Text>
            <Text style={[styles.textContainer]}>{item.subtitle}</Text>
            <View style={[external.mt_15]}>
              <RightArrow iconColor={appColors.whiteColor} />
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};
