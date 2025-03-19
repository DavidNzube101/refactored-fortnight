import { FlatList, View } from 'react-native';
import React, { useEffect } from 'react';
import { external } from '../../../../styles/externalStyle';
import { CategoryItem } from './categoryItem/index';
import { useDispatch, useSelector } from 'react-redux';
import { serviceDataGet } from '../../../../api/store/actions/serviceAction';
import { useAppNavigation } from '@src/utils/navigation';

export function CategoryDetail() {
  const { navigate } = useAppNavigation();
  const { serviceData } = useSelector((state: any) => state.service);
  const dispatch = useDispatch();


  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    dispatch(serviceDataGet());
  };

  const renderItem = ({ item }: itemType) => {
    return (
      <CategoryItem
        item={item}
        onPress={() => navigate('HomeService', { itemName: item.name, serviceValue: item })}
      />
    )
  }

  return (
    <View style={[external.as_center]}>
      <FlatList
        renderItem={renderItem}
        data={serviceData?.data || []}
        keyExtractor={(item) => item.id?.toString() || item.someUniqueField} />
    </View>
  );
};
