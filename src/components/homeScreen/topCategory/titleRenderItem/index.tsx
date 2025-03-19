import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { styles } from '../styles';
import { RightSmallArrow } from '@utils/icons';
import { appColors, windowHeight } from '@src/themes';
import { useValues } from '../../../../../App';
import { useAppNavigation } from '@src/utils/navigation';

export function TitleRenderItem({ item, categoryOption, categoryOptionID }) {
  const { isDark, bgContainer,  isRTL } = useValues();
  const { navigate } = useAppNavigation();

  const handlePress = (categorySlug) => {
    if (categorySlug === 'intercity' || categorySlug === 'ride') {
      navigate('Ride', {
        categoryId: item.categoryId,
        categoryOption: categoryOption,
        categoryOptionID: categoryOptionID,
        categorySlug: categorySlug,
      });
    } else if (categorySlug === 'package') {
      navigate('RentalLocation', {
        categoryId: item.categoryId,
        categoryOption: categoryOption,
        categoryOptionID: categoryOptionID,
        categorySlug: categorySlug,
      });
    } else if (categorySlug === 'schedule') {
      navigate('Ride', {
        categoryId: item.categoryId,
        categoryOption: categoryOption,
        categoryOptionID: categoryOptionID,
        categorySlug: categorySlug,
      });
    } else if (categorySlug === 'rental') {
      navigate('RentalBooking', {
        categoryId: item.categoryId,
        categoryOption: categoryOption,
        categoryOptionID: categoryOptionID,
        categorySlug: categorySlug,
      });
    }
  };

  return (
    <Pressable
      style={[
        styles.itemContainer,
        {
          backgroundColor: bgContainer,
          borderColor: isDark ? appColors.darkBorder : appColors.primaryGray,
        },
      ]}
      onPress={() => handlePress(item.categorySlug)}
    >
      <View
        style={[
          styles.mainContainer,
          { alignItems: isRTL ? "flex-end" : "flex-start" },  
        ]}
      >
        <Text style={[styles.itemText, { color: appColors.buttonBg }]}>
          {item.categoryName}
        </Text>
        <View style={[styles.arrowContainer]}>
          <RightSmallArrow style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }} />
        </View>
      </View>

      <Image
        style={[
          styles.carImage,
          {right:isRTL?windowHeight(70):5}
        ]}
        source={{ uri: item.categoryImage }}
      />
    </Pressable>

  );
};
