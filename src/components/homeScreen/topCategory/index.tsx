import { FlatList, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { external } from "../../../styles/externalStyle";
import { TitleContainer } from "@src/commonComponent";
import { styles } from "./styles";
import { TitleRenderItem } from "./titleRenderItem/index";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryDataGet,
  serviceDataGet,
} from "../../../api/store/actions/index";
import { getValue } from "@src/utils/localstorage";
import { useIsFocused } from "@react-navigation/native";
import { LocationContext } from "@src/utils/locationContext";

export function TopCategory() {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.serviceCategory);
  const { serviceData } = useSelector((state) => state.service);
  const [categoryOption, setCategoryOption] = useState();
  const isFocused = useIsFocused();
  const [cabServiceData, setCabServiceData] = useState([]);
  const context = useContext(LocationContext);
  const { categoryOptionID, setCategoryOptionID } = context;
  const { translateData } = useSelector((state: any) => state.setting);

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const value = await getValue("selectedPrimaryService");
          const valueID = await getValue("selectedPrimaryServiceID");
          if (value !== null) {
            setCategoryOption(value);
            setCategoryOptionID(valueID);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (categoryData?.data) {
      let filteredCabServices = [];
      if (categoryOption) {
        filteredCabServices = categoryData.data
          .filter((category) =>
            category.used_for?.some(
              (item) =>
                item?.slug.toLowerCase() === categoryOption.toLowerCase()
            )
          )
          ?.map((category) => ({
            categoryId: category.id,
            categoryName: category.name,
            categoryImage: category.service_category_image.original_url,
            categorySlug: category.slug,
          }));
      }

      if (
        (!categoryOption || filteredCabServices.length === 0) &&
        serviceData?.data
      ) {
        const primaryService = serviceData.data.find(
          (item) => item.is_primary === 1
        );
        if (primaryService) {
          filteredCabServices = categoryData?.data
            .filter((category) =>
              category?.used_for?.some(
                (item) =>
                  item?.slug.toLowerCase() === primaryService.type.toLowerCase()
              )
            )
            ?.map((category) => ({
              categoryId: category.id,
              categoryName: category.name,
              categoryImage: category.service_category_image.original_url,
              categorySlug: category.slug,
            }));
          setCategoryOption(primaryService.name),
            setCategoryOptionID(primaryService.id);
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

  const renderItem = ({ item }) => {
    return (
      <TitleRenderItem
        item={item}
        categoryOption={categoryOption}
        categoryOptionID={categoryOptionID}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topCategoryTitle, external.mh_20, external.mb_10]}>
        <TitleContainer title={translateData.topCategories} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          ItemSeparatorComponent={itemSeparator}
          data={cabServiceData}
          renderItem={renderItem}
          contentContainerStyle={external.mh_2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
}
