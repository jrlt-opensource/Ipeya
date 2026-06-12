import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import {
    MaterialIcons,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#5A0B78';

export default function HomeScreen() {
    const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);

    const stats = [
        '⚠️ Threat level: Medium in your area',
        '📍 Last SOS: 2 mins ago',
        '🚨 3 alerts active nearby',
        '🛡️ Safe zones nearby: 2',
        '📡 Network status: Stable',
    ];

    /* ---------------- SOS PULSE ---------------- */

    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.12,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    /* ---------------- TICKER ---------------- */

    const tickerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(tickerAnim, {
                toValue: -2500,
                duration: 40000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const triggerSOS = () => {
        Alert.alert(
            'Emergency SOS',
            'Your trusted contacts and emergency network will be notified.'
        );
    };

    const toggleAlert = (id: string) => {
        if (selectedAlerts.includes(id)) {
            setSelectedAlerts(prev => prev.filter(x => x !== id));
        } else {
            setSelectedAlerts(prev => [...prev, id]);
        }
    };

    const menuItems = [
        {
            title: 'Generate Pairing Code',
            icon: 'qr-code',
        },
        {
            title: 'View Reports',
            icon: 'assessment',
        },
        {
            title: 'View History',
            icon: 'history',
        },
        {
            title: 'Manage Trusted Contacts',
            icon: 'people',
        },
        {
            title: 'Notification Settings',
            icon: 'notifications',
        },
        {
            title: 'Terms and Conditions',
            icon: 'description',
        },
        {
            title: 'Privacy Policy',
            icon: 'privacy-tip',
        },
        {
            title: 'Credits and Licenses',
            icon: 'verified',
        },
        {
            title: 'Customer Support',
            icon: 'support-agent',
        },
        {
            title: 'Share Feedback',
            icon: 'feedback',
        },
        {
            title: 'Invite a Trusted Contact',
            icon: 'person-add',
        },
    ];

    const alertTypes = [
        {
            id: 'theft',
            icon: (
                <MaterialIcons
                    name="local-police"
                    size={28}
                    color="#fff"
                />
            ),
        },
        {
            id: 'fire',
            icon: (
                <MaterialCommunityIcons
                    name="fire"
                    size={28}
                    color="#fff"
                />
            ),
        },
        {
            id: 'gun',
            icon: (
                <MaterialCommunityIcons
                    name="pistol"
                    size={28}
                    color="#fff"
                />
            ),
        },
        {
            id: 'kidnap',
            icon: (
                <FontAwesome5
                    name="user-secret"
                    size={24}
                    color="#fff"
                />
            ),
        },
        {
            id: 'medical',
            icon: (
                <Ionicons
                    name="medical"
                    size={28}
                    color="#fff"
                />
            ),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}

            <View style={styles.headerRow}>
                <Text style={styles.brand}>
                    Ipeya
                </Text>

                <View style={styles.tickerWrapper}>
                    <Animated.View
                        style={[
                            styles.tickerTrack,
                            {
                                transform: [
                                    {
                                        translateX: tickerAnim,
                                    },
                                ],
                            },
                        ]}
                    >
                        {[...stats, ...stats, ...stats].map(
                            (item, index) => (
                                <Text
                                    key={index}
                                    style={styles.tickerText}
                                >
                                    {item} •
                                </Text>
                            )
                        )}
                    </Animated.View>
                </View>

                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() =>
                        setMenuVisible(true)
                    }
                >
                    <MaterialIcons
                        name="menu"
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            {/* SOS SECTION */}

            <View style={styles.topSection}>
                <Animated.View
                    style={{
                        transform: [
                            {
                                scale: pulseAnim,
                            },
                        ],
                    }}
                >
                    <TouchableOpacity
                        style={styles.sosCircle}
                        onPress={triggerSOS}
                    >
                        <Text style={styles.sosText}>
                            SOS
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <Text style={styles.sosHint}>
                    Tap in an emergency to alert
                    your trusted contacts
                </Text>
            </View>

            {/* INCIDENT TYPES */}

            <View style={styles.iconSection}>
                {alertTypes.map(item => {
                    const active =
                        selectedAlerts.includes(
                            item.id
                        );

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.iconButton,
                                active &&
                                styles.iconButtonActive,
                            ]}
                            onPress={() =>
                                toggleAlert(
                                    item.id
                                )
                            }
                        >
                            {item.icon}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* MENU MODAL */}

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setMenuVisible(false)
                }
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() =>
                        setMenuVisible(false)
                    }
                >
                    <Pressable
                        style={styles.menuModal}
                    >
                        <Text
                            style={styles.menuTitle}
                        >
                            Menu
                        </Text>

                        <ScrollView
                            showsVerticalScrollIndicator={
                                false
                            }
                        >
                            {menuItems.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <TouchableOpacity
                                        key={
                                            index
                                        }
                                        style={
                                            styles.menuItem
                                        }
                                        onPress={() => {
                                            setMenuVisible(
                                                false
                                            );

                                            Alert.alert(
                                                item.title
                                            );
                                        }}
                                    >
                                        <MaterialIcons
                                            name={
                                                item.icon as any
                                            }
                                            size={
                                                22
                                            }
                                            color={
                                                PRIMARY
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.menuText
                                            }
                                        >
                                            {
                                                item.title
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}

                            <View
                                style={
                                    styles.versionContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.versionText
                                    }
                                >
                                    Version
                                    2.26.21.75
                                </Text>
                            </View>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    brand: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '800',
        marginRight: 12,
    },

    tickerWrapper: {
        flex: 1,
        overflow: 'hidden',
        height: 32,
        justifyContent: 'center',
    },

    tickerTrack: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    tickerText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        marginRight: 40,
    },

    menuButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor:
            'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

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
        fontSize: 64,
        fontWeight: '800',
    },

    sosHint: {
        color: 'rgba(255,255,255,0.8)',
        marginTop: 24,
        fontSize: 14,
    },

    iconSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 14,
        paddingBottom: 40,
    },

    iconButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor:
            'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconButtonActive: {
        backgroundColor: '#ff4444',
    },

    overlay: {
        flex: 1,
        backgroundColor:
            'rgba(0,0,0,0.45)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },

    menuModal: {
        marginTop: 60,
        marginRight: 16,
        width: 320,
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingVertical: 10,
    },

    menuTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: PRIMARY,
        paddingHorizontal: 18,
        paddingVertical: 14,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 14,
    },

    menuText: {
        marginLeft: 14,
        fontSize: 15,
        color: '#333',
    },

    versionContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 8,
        padding: 18,
    },

    versionText: {
        color: '#777',
        textAlign: 'center',
        fontSize: 13,
    },
});