import { ScrollView, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { HeaderContainer } from "@src/commonComponent";
import Images from "@utils/images";
import { styles } from "./style";
import { useValues } from "../../../../../App";
import { useDispatch, useSelector } from "react-redux";
import { couponListData } from "@src/api/store/actions";
import { NoInternet } from "@src/components";
import { Coupons } from "./component/coupons";
import { external } from "@src/styles/externalStyle";
import { LocationContext } from "@src/utils/locationContext";
import { CouponLoader } from "./couponLoader";
import { windowHeight } from "@src/themes";

export function PromoCodeScreen({ route }) {
  const context = useContext(LocationContext);
  const { categoryOptionID } = context;
  const { bgFullStyle, linearColorStyle, isDark } = useValues();
  const dispatch = useDispatch();
  const { couponsList, statusCode, loading } = useSelector((state: any) => state.coupon);
  const { translateData } = useSelector((state: any) => state.setting);

  useEffect(() => {
    const service_id = categoryOptionID,
      zoneIds = 2;
    dispatch(couponListData({ service_id, zoneIds }));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: linearColorStyle }]}>
      <View style={[styles.headerContainer, { backgroundColor: bgFullStyle }]}>
        <HeaderContainer value={translateData.promoCodes} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[external.mh_10, external.mt_10]}>
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <View key={index} style={styles.couponLoader}>
                <CouponLoader />
              </View>
            ))
          ) : (
            <Coupons couponsList={couponsList} route={route} />
          )}

        </View>
      </ScrollView>
      {couponsList?.data?.length === 0 && (
        <View style={{ height: "90%" }}>
          <NoInternet
            btnHide={true}
            title={translateData.noCoupons}
            details={translateData.noCouponDes}
            infoIcon
            image={isDark ? Images.noOfferDark : Images.noOffer}
            status={`${translateData.statusCode}: ${statusCode}`}
          />
        </View>
      )}
    </View>
  );
}
