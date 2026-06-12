import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AddContact() {
    const [code, setCode] = useState("");
    const [activeCode, setActiveCode] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((t) => {
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
        Alert.alert("Pairing Code Generated", "Share this code with your trusted contact.");
    };

    const saveContact = async () => {
        if (!code) {
            Alert.alert("Error", "Please enter a pairing code");
            return;
        }

        setLoading(true);

        // Simulate notification send + processing
        await new Promise((res) => setTimeout(res, 2000));

        const contacts = [
            {
                id: Date.now(),
                name: "Trusted Contact 1",
                code,
                enabled: true,
            },
        ];

        await AsyncStorage.setItem(
            "ipeya_contacts",
            JSON.stringify(contacts)
        );

        setLoading(false);

        Alert.alert(
            "Request Sent",
            "Your trusted contact can approve anytime later."
        );

        router.replace("/home");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Trusted Contact</Text>

            <Text style={styles.subtitle}>
                Connect with someone you trust. They must already have the Ipeya app installed.
            </Text>

            {/* STEP 1 */}
            <View style={styles.card}>
                <Text style={styles.stepTitle}>Step 1: Get Pairing Code</Text>

                <Text style={styles.stepText}>
                    Ask your trusted contact to generate a pairing code from their SOS screen.
                </Text>

                <TouchableOpacity
                    style={styles.secondaryBtn}

                >
                    <Text style={styles.secondaryBtnText}>
                        Share how to get pairing code with your trusted contact
                    </Text>
                </TouchableOpacity>

                {/*<TouchableOpacity*/}
                {/*    style={styles.secondaryBtn}*/}
                {/*    onPress={generateCode}*/}
                {/*>*/}
                {/*    <Text style={styles.secondaryBtnText}>*/}
                {/*        Generate Sample Code*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}

                {activeCode && (
                    <View style={styles.codeBox}>
                        <Text style={styles.codeLabel}>PAIRING CODE</Text>
                        <Text style={styles.code}>{activeCode}</Text>
                        <Text style={styles.timer}>
                            Expires in {timer}s
                        </Text>
                    </View>
                )}
            </View>

            {/* STEP 2 */}
            <View style={styles.card}>
                <Text style={styles.stepTitle}>Step 2: Enter Code</Text>

                <TextInput
                    placeholder="Enter pairing code"
                    placeholderTextColor="#999"
                    value={code}
                    onChangeText={setCode}
                    style={styles.input}
                    keyboardType="numeric"
                />
            </View>

            {/* STEP 3 */}
            <View style={styles.card}>
                <Text style={styles.stepTitle}>Step 3: Confirm Connection</Text>

                <Text style={styles.stepText}>
                    A notification will be sent to your trusted contact. They can approve anytime later.
                </Text>

                <TouchableOpacity
                    style={[styles.primaryBtn, loading && { opacity: 0.6 }]}
                    onPress={saveContact}
                    disabled={loading}
                >
                    <Text style={styles.primaryBtnText}>
                        {loading ? "Sending Request..." : "Buzz & Continue"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5A0B78",
        padding: 20,
    },

    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        color: "#E6D6F0",
        fontSize: 13,
        marginBottom: 20,
        lineHeight: 18,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
    },

    stepTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5A0B78",
        marginBottom: 6,
    },

    stepText: {
        fontSize: 13,
        color: "#444",
        lineHeight: 18,
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
    },

    primaryBtn: {
        backgroundColor: "#E11D48",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },

    primaryBtnText: {
        color: "#fff",
        fontWeight: "700",
    },

    secondaryBtn: {
        backgroundColor: "#5A0B78",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
    },

    secondaryBtnText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },

    codeBox: {
        marginTop: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        backgroundColor: "#F5F3FF",
    },

    codeLabel: {
        fontSize: 11,
        color: "#666",
        letterSpacing: 1,
    },

    code: {
        fontSize: 26,
        fontWeight: "800",
        color: "#5A0B78",
        marginVertical: 4,
    },

    timer: {
        fontSize: 12,
        color: "#E11D48",
        fontWeight: "600",
    },
});