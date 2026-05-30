import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const phone = await AsyncStorage.getItem("ipeya_phone");
    const contacts = await AsyncStorage.getItem("ipeya_contacts");

    const parsedContacts = contacts ? JSON.parse(contacts) : [];

    if (!phone) {
      router.replace("/login");
      return;
    }

    if (!parsedContacts || parsedContacts.length === 0) {
      router.replace("/add-contact");
      return;
    }

    router.replace("/home");
  };

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5A0B78" />
      </View>
  );
}