import React, {useState, useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

export default function AddContact() {

    const [code, setCode] = useState("");
    const [activeCode, setActiveCode] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [buzzEnabled, setBuzzEnabled] = useState(false);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(t => {
                if (t <= 1) {
                    setActiveCode(null);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const generateCode = () => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        setActiveCode(newCode);
        setTimer(10);
        setBuzzEnabled(false);
    };

    const verify = () => {
        if (code === activeCode) {
            setBuzzEnabled(true);
            Alert.alert("Success", "Code verified");
        } else {
            Alert.alert("Error", "Invalid code");
        }
    };

    const saveContact = async () => {
        const contacts = [
            {id: Date.now(), name: "Trusted Contact 1", enabled: true},
        ];

        await AsyncStorage.setItem("ipeya_contacts", JSON.stringify(contacts));

        router.replace("/home");
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Add Contact</Text>
            <Text>Add a close contact that will be alerted when you are in danger. The contact you are adding must be registered on Ipeya. </Text>

            {/*<TouchableOpacity style={styles.btn} onPress={generateCode}>*/}
            {/*    <Text style={styles.btnText}>*/}
            {/*        Generate Code {timer ? `(${timer}s)` : ""}*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}

            {activeCode && <Text style={styles.code}>CODE: {activeCode}</Text>}

            <TextInput
                placeholder="Enter code"
                value={code}
                onChangeText={setCode}
                style={styles.input}
            />

            {/*<TouchableOpacity style={styles.verify} onPress={verify}>*/}
            {/*    <Text style={styles.verifyText}>Verify</Text>*/}
            {/*</TouchableOpacity>*/}


                <TouchableOpacity style={styles.buzz} onPress={saveContact}>
                    <Text style={styles.buzzText}>BUZZ & CONTINUE</Text>
                </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#5A0B78", justifyContent: "center", padding: 20},
    title: {color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20},
    btn: {backgroundColor: "#fff", padding: 12, borderRadius: 8},
    btnText: {color: "#5A0B78", textAlign: "center", fontWeight: "bold"},
    code: {color: "#fff", textAlign: "center", marginVertical: 10},
    input: {backgroundColor: "#fff", padding: 12, borderRadius: 8, marginTop: 10},
    verify: {backgroundColor: "#000", padding: 12, borderRadius: 8, marginTop: 10},
    verifyText: {color: "#fff", textAlign: "center"},
    buzz: {backgroundColor: "red", padding: 15, borderRadius: 10, marginTop: 20},
    buzzText: {color: "#fff", textAlign: "center", fontWeight: "bold"},
});