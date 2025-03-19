import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Header } from '@src/commonComponent';
import { RightArrow } from '@src/utils/icons';
import { appColors } from '@src/themes';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDataGet, serviceDataGet } from '@src/api/store/actions';
import styles from './styles';
import { useValues } from '@App';


export function HomeService() {
  const route = useRoute();
  const { itemName, serviceValue } = route.params || {};
  const { categoryData } = useSelector((state: any) => state.serviceCategory);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { serviceData } = useSelector((state: any) => state.service);
  const [categoryOption, setCategoryOption] = useState(serviceValue?.name);
  const [categoryOptionID, setCategoryOptionID] = useState(serviceValue?.id);
  const [cabServiceData, setCabServiceData] = useState([]);
  const { isDark, linearColorStyle, bgFullLayout, viewRTLStyle } = useValues()

  useEffect(() => {
    if (categoryData?.data) {
      let filteredCabServices = [];

      if (categoryOption) {
        filteredCabServices = categoryData.data
          .filter((category: any) =>
            category.used_for?.some((item: any) => item.name.toLowerCase() === categoryOption.toLowerCase())
          )
          ?.map((category: any) => ({
            categoryId: category.id,
            categoryName: category.name,
            categoryImage: category.service_category_image.original_url,
            categorySlug: category.slug
          }));
      }

      if ((!categoryOption || filteredCabServices.length === 0) && serviceData?.data) {
        const primaryService = serviceData.data.find((item: any) => item.is_primary === 1);
        if (primaryService) {
          filteredCabServices = categoryData.data
            .filter((category: any) =>
              category.used_for?.some((item: any) => item.toLowerCase() === primaryService.type.toLowerCase())
            )
            ?.map((category: any) => ({
              categoryId: category.id,
              categoryName: category.name,
              categoryImage: category.service_category_image.original_url,
              categorySlug: category.slug

            }));
        }
      }
      setCabServiceData(filteredCabServices);
    }
  }, [categoryOption, categoryData?.data, serviceData?.data]);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = () => {
    dispatch(categoryDataGet());
    dispatch(serviceDataGet());
  };

  const itemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7} style={[styles.categoryItem, { flexDirection: viewRTLStyle }, { backgroundColor: isDark ? bgFullLayout : appColors.whiteColor }, { borderColor: isDark ? appColors.darkBorder : appColors.border }]}>
      <View style={styles.renderView}>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <RightArrow iconColor={appColors.regularText} />
      </View>
      <View >
        <Image source={{ uri: item?.categoryImage }} style={styles.categoryImage} />
      </View>
    </TouchableOpacity>
  );



  const handlePress = (categoryName) => {
    if (categoryName?.categorySlug === 'intercity' || categoryName?.categorySlug === 'ride') {
      navigate('Ride', {
        categoryId: categoryOptionID,
        categoryOption: itemName,
        categoryOptionID: categoryName?.categoryId,
        categorySlug: categoryName?.categorySlug
      });
    } else if (categoryName?.categorySlug === 'package') {
      navigate('RentalLocation', {
        categoryId: categoryOptionID,
        categoryOption: itemName,
        categoryOptionID: categoryName?.categoryId,
        categorySlug: categoryName?.categorySlug,
      });
    } else if (categoryName?.categorySlug === 'schedule') {
      navigate('Ride', {
        categoryId: categoryOptionID,
        categoryOption: itemName,
        categoryOptionID: categoryName?.categoryId,
        categorySlug: categoryName?.categorySlug,
      });
    }
    else if (categoryName?.categorySlug === 'rental') {
      navigate('RentalBooking', {
        categoryId: categoryOptionID,
        categoryOption: itemName,
        categoryOptionID: categoryName?.categoryId,
        categorySlug: categoryName?.categorySlug,
      });
    }
  }

  return (
    <View style={[styles.mainView, { backgroundColor: isDark ? linearColorStyle : appColors.lightGray }]}>
      <Header value={itemName} />
      <View style={styles.listView}>
        <FlatList
          ItemSeparatorComponent={itemSeparator}
          data={cabServiceData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
        />

      </View>
    </View>
  );
}

