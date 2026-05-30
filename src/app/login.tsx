import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import {
    PhoneAuthProvider,
    signInWithCredential,
} from '@firebase/auth';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import { auth } from '@/lib/firebase';

export default function LoginScreen() {
    const recaptchaVerifier = useRef<any>(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [code, setCode] = useState('');
    const [sending, setSending] = useState(false);

    const sendOTP = async () => {
        try {
            setSending(true);

            // const provider = new PhoneAuthProvider(auth);
            //
            // const verificationId = await provider.verifyPhoneNumber(
            //     phoneNumber,
            //     recaptchaVerifier.current
            // );
            //
            // setVerificationId(verificationId);

            router.replace('/add-contact');

            Alert.alert('Success', 'OTP sent');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setSending(false);
        }
    };

    const verifyOTP = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                code
            );

            const userCredential = await signInWithCredential(
                auth,
                credential
            );

            const phone = userCredential.user.phoneNumber;

            await AsyncStorage.setItem(
                'ipeya_phone',
                phone || phoneNumber
            );

            router.replace('/add-contact');
        } catch (error: any) {
            Alert.alert('Verification Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>

            {/*<FirebaseRecaptchaVerifierModal*/}
            {/*    ref={recaptchaVerifier}*/}
            {/*    firebaseConfig={auth.app.options}*/}
            {/*/>*/}

            <Text style={styles.brand}>Ipeya</Text>

            <View style={styles.center}>

                <TextInput
                    style={styles.input}
                    placeholder="+2348012345678"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {!verificationId ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={sendOTP}
                        disabled={sending}
                    >
                        <Text style={styles.buttonText}>
                            Send OTP
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            keyboardType="number-pad"
                            value={code}
                            onChangeText={setCode}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={verifyOTP}
                        >
                            <Text style={styles.buttonText}>
                                Verify OTP
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

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
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
    },

    buttonText: {
        color: '#5A0B78',
        fontWeight: '700',
        textAlign: 'center',
    },
});