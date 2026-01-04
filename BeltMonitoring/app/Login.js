import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

const { height, width } = Dimensions.get('window');

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadSavedCredentials();
    }, []);

    const loadSavedCredentials = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem('savedEmail');
            const savedPassword = await AsyncStorage.getItem('savedPassword');
            const wasRemembered = await AsyncStorage.getItem('rememberMe');

            if (wasRemembered === 'true' && savedEmail) {
                setEmail(savedEmail);
                setPassword(savedPassword || '');
                setRememberMe(true);
            }
        } catch (error) {
            console.log('Error loading saved credentials:', error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);

            if (rememberMe) {
                await AsyncStorage.setItem('savedEmail', email);
                await AsyncStorage.setItem('savedPassword', password);
                await AsyncStorage.setItem('rememberMe', 'true');
            } else {
                await AsyncStorage.removeItem('savedEmail');
                await AsyncStorage.removeItem('savedPassword');
                await AsyncStorage.removeItem('rememberMe');
            }

            router.push("/Dashboard");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Tea Bi Logo Area */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Tea Bi</Text>
                    <Text style={styles.logoLeaf}>Leaf</Text>
                    <Text style={styles.tagline}>Belt Monitoring System</Text>
                </View>

                {/* Title */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Sign in to monitor your belt</Text>
                </View>

                {/* Input Fields */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    {/* Remember Me Checkbox */}
                    <TouchableOpacity
                        style={styles.rememberMeContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && (
                                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                            )}
                        </View>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Powered by Tea Bi Technology</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9",
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.05,
        justifyContent: "center",
        minHeight: height,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: height * 0.04,
    },
    logoText: {
        fontSize: Math.min(width * 0.12, 48),
        fontWeight: "300",
        color: "#2E7D32",
        letterSpacing: 3,
    },
    logoLeaf: {
        fontSize: Math.min(width * 0.11, 44),
        color: "#2E7D32",
        marginTop: -12,
    },
    tagline: {
        fontSize: Math.min(width * 0.04, 16),
        color: "#1B5E20",
        marginTop: 10,
        fontWeight: "500",
        textAlign: "center",
    },
    headerContainer: {
        marginBottom: height * 0.03,
    },
    title: {
        fontSize: Math.min(width * 0.08, 32),
        fontWeight: "700",
        color: "#1B5E20",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Math.min(width * 0.045, 18),
        color: "#4CAF50",
        textAlign: "center",
        fontWeight: "500",
    },
    formContainer: {
        width: "100%",
        marginBottom: height * 0.02,
    },
    input: {
        height: Math.max(height * 0.065, 50),
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: Math.min(width * 0.042, 17),
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 5,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        marginTop: 4,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#2E7D32",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: "#2E7D32",
        borderColor: "#2E7D32",
    },
    rememberMeText: {
        fontSize: Math.min(width * 0.04, 16),
        color: "#1B5E20",
        fontWeight: "500",
    },
    loginButton: {
        height: Math.max(height * 0.07, 50),
        backgroundColor: "#2E7D32",
        borderRadius: 29,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: Math.min(width * 0.05, 20),
        fontWeight: "600",
    },
    footerText: {
        textAlign: "center",
        marginTop: height * 0.03,
        color: "#666",
        fontSize: Math.min(width * 0.035, 14),
    },
});