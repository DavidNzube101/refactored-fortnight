import React, { useContext, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { external } from "../../../styles/externalStyle";
import { TitleContainer } from "@src/commonComponent";
import { Coupons } from "@src/screens/bottomTab/profileTab/promoCode/component/coupons";
import { couponListData } from "@src/api/store/actions";
import Images from "@src/utils/images";
import { NoInternet } from "@src/components/noInternet";
import { LocationContext } from "@src/utils/locationContext";
import { useValues } from "@App";
import styles from "./styles";

export function TodayOfferContainer() {
  const dispatch = useDispatch();
  const { couponsList, statusCode } = useSelector((state) => state.coupon);
  const { categoryOptionID } = useContext(LocationContext);
  const { isDark, viewRTLStyle } = useValues();
  const { translateData } = useSelector((state: any) => state.setting);

  useEffect(() => {
    dispatch(
      couponListData({
        service_category_id: 1,
        service_id: categoryOptionID,
        zoneIds: 2,
      })
    );
  }, [dispatch, categoryOptionID]);

  const displayedCoupons = useMemo(() => couponsList?.data?.slice(0, 3), [couponsList]);

  return (
    <View>
      <View style={[styles.titleContainer, external.mh_20]}>
        <TitleContainer title={translateData.trendingOffer} />
      </View>

      <View style={[styles.couponsList, external.mh_10]}>
        {displayedCoupons?.length > 0 ? (
          <Coupons couponsList={{ ...couponsList, data: displayedCoupons }} />
        ) : (
          <View style={[styles.NoInternetView, { flexDirection: viewRTLStyle }]}>
            <NoInternet
              btnHide
              title={translateData.noCoupons}
              details={translateData.noCouponDes}
              image={isDark ? Images.noOfferDark : Images.noOffer}
              infoIcon
              status={`${translateData.statusCode} ${statusCode}`}
            />
          </View>
        )}
      </View>
    </View>
  );
}
