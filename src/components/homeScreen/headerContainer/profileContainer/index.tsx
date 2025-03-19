import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useValues } from "@App";
import styles from "./styles";

export function ProfileContainer() {
  const { viewRTLStyle } = useValues();
  const { self} = useSelector((state: any) => state.account);

  const char = self?.name ? self.name.charAt(0) : "";
  const [greeting, setGreeting] = useState("");
  const [welcom, setWelcome] = useState("");
  useEffect(() => {
    const greetings = ["Hi", "Hey", "Hello"];
    const welcom = [
      "Welcome back 👋",
      "Hey there, glad you're back!",
      "Good to see you again!",
    ];
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    const randomWelcom = welcom[Math.floor(Math.random() * welcom.length)];
    setGreeting(randomGreeting);
    setWelcome(randomWelcom);
  }, []);

  return (
    <View style={[styles.mainView, { flexDirection: viewRTLStyle }]}>
      <View style={styles.imageView}>
        {self?.profile_image?.original_url ? (
          <Image
            style={styles.imageStyle}
            source={{ uri: self?.profile_image?.original_url }}
          />
        ) : (
          <View style={styles.textView}>
            <Text style={styles.charText}>{char || "G"}</Text>
          </View>
        )}
      </View>
      <View style={styles.viewText}>
        <Text style={styles.text}>{welcom}</Text>
        <Text style={styles.selfName}>
          {greeting} {self?.name || "Guest"},
        </Text>
      </View>
    </View>
  );
}
