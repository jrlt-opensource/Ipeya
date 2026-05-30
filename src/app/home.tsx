import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    Animated,
    Dimensions,
} from 'react-native';
import {
    MaterialIcons,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

    const [contacts, setContacts] = useState([
        { id: 1, name: 'John Doe', enabled: true },
        { id: 2, name: 'Mary Johnson', enabled: false },
        { id: 3, name: 'David Smith', enabled: true },
        { id: 4, name: 'Aisha Bello', enabled: false },
        { id: 5, name: 'Michael James', enabled: true },
        { id: 6, name: 'Fatima Musa', enabled: true },
        { id: 7, name: 'Ibrahim Yusuf', enabled: false },
    ]);

    const stats = [
        '⚠️ Threat level: Medium in your area',
        '📍 Last SOS: 2 mins ago',
        '🚨 3 alerts active nearby',
        '🛡️ Safe zones nearby: 2',
        '📡 Network status: Stable',
    ];

    const scrollX = useRef(new Animated.Value(0)).current;

    /* ---------------- SOS PULSE ---------------- */
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    /* ---------------- INFINITE MARQUEE ---------------- */
    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -width,
                duration: 12000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const toggleAlert = (id: string) => {
        if (selectedAlerts.includes(id)) {
            setSelectedAlerts(selectedAlerts.filter(i => i !== id));
        } else {
            setSelectedAlerts([...selectedAlerts, id]);
        }
    };

    const toggleContact = (id: number) => {
        setContacts(prev =>
            prev.map(c =>
                c.id === id ? { ...c, enabled: !c.enabled } : c
            )
        );
    };

    const triggerSOS = () => {
        alert('🚨 Emergency SOS Triggered');
    };

    const alertTypes = [
        { id: 'theft', icon: <MaterialIcons name="local-police" size={28} color="white" /> },
        { id: 'fire', icon: <MaterialCommunityIcons name="fire" size={28} color="white" /> },
        { id: 'gun', icon: <MaterialCommunityIcons name="pistol" size={28} color="white" /> },
        { id: 'kidnap', icon: <FontAwesome5 name="user-secret" size={24} color="white" /> },
        { id: 'medical', icon: <Ionicons name="medical" size={28} color="white" /> },
    ];

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={styles.headerRow}>

                {/* LEFT */}
                <Text style={styles.brand}>Ipeya</Text>

                {/* CENTER (FULL WIDTH MARQUEE) */}
                <View style={styles.marqueeWrapper}>
                    <Animated.View
                        style={[
                            styles.marqueeTrack,
                            { transform: [{ translateX: scrollX }] },
                        ]}
                    >
                        {/* duplicated for infinite loop feel */}
                        {[...stats, ...stats].map((item, index) => (
                            <Text key={index} style={styles.marqueeText}>
                                {item}   •   {' '}
                            </Text>
                        ))}
                    </Animated.View>
                </View>

                {/* RIGHT */}
                <TouchableOpacity style={styles.menuButton}>
                    <MaterialIcons name="menu" size={28} color="#fff" />
                </TouchableOpacity>

            </View>

            {/* SOS */}
            <View style={styles.topSection}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <TouchableOpacity style={styles.sosCircle} onPress={triggerSOS}>
                        <Text style={styles.sosText}>SOS</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* ICONS (CENTER PACKED) */}
            <View style={styles.iconSection}>
                {alertTypes.map(item => {
                    const active = selectedAlerts.includes(item.id);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.iconButton,
                                active && styles.iconButtonActive,
                            ]}
                            onPress={() => toggleAlert(item.id)}
                        >
                            {item.icon}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* CONTACTS */}
            <View style={styles.bottomSection}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {contacts.map(contact => (
                        <View key={contact.id} style={styles.contactRow}>
                            <Text style={styles.contactName}>{contact.name}</Text>
                            <Switch
                                value={contact.enabled}
                                onValueChange={() => toggleContact(contact.id)}
                            />
                        </View>
                    ))}

                    <View style={styles.addButtonWrapper}>
                        <TouchableOpacity style={styles.addButton}>
                            <MaterialIcons name="add" size={32} color={PRIMARY} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

/* ================= STYLES ================= */

const PRIMARY = '#5A0B78';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
        paddingHorizontal: 16,
    },

    /* HEADER */
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    brand: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        width: 60,
    },

    marqueeWrapper: {
        flex: 1,
        overflow: 'hidden',
        height: 30,
        justifyContent: 'center',
    },

    marqueeTrack: {
        flexDirection: 'row',
    },

    marqueeText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        marginRight: 25,
    },

    menuButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    /* SOS */
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sosCircle: {
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 4,
        borderColor: '#fff',
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sosText: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
    },

    /* ICONS CENTER PACKED */
    iconSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 14,
        marginVertical: 20,
    },

    iconButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconButtonActive: {
        backgroundColor: '#ff4444',
    },

    /* CONTACTS */
    bottomSection: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },

    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },

    contactName: {
        color: '#fff',
        fontSize: 16,
    },

    addButtonWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },

    addButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
});