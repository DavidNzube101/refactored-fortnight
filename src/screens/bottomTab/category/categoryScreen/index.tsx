import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { external } from '../../../../styles/externalStyle';
import { commonStyles } from '../../../../styles/commonStyle';
import {HeaderTab} from '@src/commonComponent'; 
import { CategoryDetail } from '../categoryDetail/index';
import { useValues } from '../../../../../App';
import { useSelector } from 'react-redux';
import { windowHeight } from '@src/themes';

export function CategoryScreen() {
  const { bgFullStyle, linearColorStyle} = useValues();
  const { translateData } = useSelector((state: any) => state.setting);

  return (
    <SafeAreaView
      style={[external.fx_1, external.pt_13, { backgroundColor: bgFullStyle }]}>
      <View style={[commonStyles.heightHeader]}>
        <HeaderTab tabName={translateData.categoryTitle} />
      </View>
      <ScrollView
        contentContainerStyle={[external.Pb_80]}
        showsVerticalScrollIndicator={false}
        style={[
          commonStyles.flexContainer,
          {paddingTop:windowHeight(10)},
          { backgroundColor: linearColorStyle },
        ]}>
        <CategoryDetail />
      </ScrollView>
    </SafeAreaView>
  );
};
