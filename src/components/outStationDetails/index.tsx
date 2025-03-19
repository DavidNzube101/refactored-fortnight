import { View } from "react-native";
import React, { useState } from "react";
import { external } from "../../styles/externalStyle";
import { Calender } from "@utils/icons";
import { CommonModal, Button, InputText } from "@src/commonComponent";
import { useValues } from "../../../App";
import { Calander } from "@src/screens";
import styles from "./styles";
import { useAppNavigation } from "@src/utils/navigation";

export function OutStationDetails({ onPress }) {
  const { navigate } = useAppNavigation();
  const [selected, setSelected] = useState(false);
  const { bgContainer } = useValues();

  const closemenu = () => {
    setSelected(false);
  };

  return (
    <View>
      <InputText
        showTitle={true}
        title={"Date and time"}
        backgroundColor={bgContainer}
        placeholder="Select date & time"
        rightIcon={<Calender />}
        onPress={() => setSelected(true)}
      />
      <InputText
        showTitle={true}
        title={"Number of passenger"}
        backgroundColor={bgContainer}
        placeholder="Enter total passenger no"
        keyboard={"number-pad"}
      />
      <InputText
        showTitle={true}
        title={"Enter your offer rate"}
        backgroundColor={bgContainer}
        placeholder="Enter fare amount"
        keyboard={"number-pad"}
      />
      <InputText
        showTitle={true}
        title={"Comments"}
        backgroundColor={bgContainer}
        placeholder="Enter your comments"
      />
      <View style={[external.mv_15, external.mt_25]}>
        <Button
          title={"Book Ride"}
          onPress={() => navigate("FindingDriver", { isOutstation: true })}
        />
      </View>
      <CommonModal
        isVisible={selected}
        onPress={() => setSelected(false)}
        value={
          <View>
            <Calander onPress={closemenu} />
            <View style={styles.mv}>
              <Button title="Continue" onPress={() => setSelected(false)} />
            </View>
          </View>
        }
      />
    </View>
  );
}
