import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const flipAnim = useRef(new Animated.Value(0)).current;

    const flipToOtpForm = () => {
        Animated.timing(flipAnim, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const flipToPhoneForm = () => {
        Animated.timing(flipAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleRequestOtp = async () => {
        setSendingOtp(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setSendingOtp(false);
        flipToOtpForm();
    };

    const handleValidateOtp = async () => {
        setVerifyingOtp(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setVerifyingOtp(false);

        router.replace('/add-contact');
    };

    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.brand}>Ipeya</Text>

            <View style={styles.center}>
                <View style={styles.cardContainer}>

                    {/* PHONE FORM */}
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                transform: [
                                    { perspective: 1000 },
                                    { rotateY: frontInterpolate },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.title}>
                            Verify Phone Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="+2348012345678"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />

                        <TouchableOpacity
                            style={[
                                styles.button,
                                sendingOtp && styles.disabledButton,
                            ]}
                            onPress={handleRequestOtp}
                            disabled={sendingOtp}
                        >
                            {sendingOtp ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>
                                    Request OTP
                                </Text>
                            )}
                        </TouchableOpacity>
                    </Animated.View>

                    {/* OTP FORM */}
                    <Animated.View
                        style={[
                            styles.card,
                            styles.cardBack,
                            {
                                transform: [
                                    { perspective: 1000 },
                                    { rotateY: backInterpolate },
                                ],
                            },
                        ]}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={flipToPhoneForm}
                            >
                                <Text style={styles.backButton}>
                                    ←
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.titleNoMargin}>
                                Enter OTP
                            </Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            keyboardType="number-pad"
                            value={otp}
                            onChangeText={setOtp}
                            maxLength={6}
                        />

                        <TouchableOpacity
                            style={[
                                styles.button,
                                verifyingOtp && styles.disabledButton,
                            ]}
                            onPress={handleValidateOtp}
                            disabled={verifyingOtp}
                        >
                            {verifyingOtp ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>
                                    Validate OTP
                                </Text>
                            )}
                        </TouchableOpacity>
                    </Animated.View>

                </View>
                <Text style={styles.disclaimer}>
                    By requesting an OTP, you agree to our{' '}
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL('https://example.com/terms')}
                    >
                        Terms & Conditions
                    </Text>{' '}
                    and{' '}
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL('https://example.com/privacy')}
                    >
                        Privacy Policy
                    </Text>
                    .
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A0B78',
        padding: 20,
    },

    brand: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 10,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContainer: {
        width: '100%',
        height: 260,
    },

    card: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        backfaceVisibility: 'hidden',
    },

    cardBack: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },

    backButtonContainer: {
        paddingVertical: 6,
        paddingRight: 12,
        paddingLeft: 4,
    },

    backButton: {
        color: '#5A0B78',
        fontSize: 24,
        fontWeight: '700',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#5A0B78',
        marginBottom: 24,
    },

    titleNoMargin: {
        fontSize: 20,
        fontWeight: '700',
        color: '#5A0B78',
    },

    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#5A0B78',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
    },

    disabledButton: {
        opacity: 0.8,
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    disclaimer: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 22,
        fontSize: 14,
    },

    link: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});