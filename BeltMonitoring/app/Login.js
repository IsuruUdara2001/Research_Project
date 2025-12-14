import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/Alert");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* Tea Bi Logo Area */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Tea Bi</Text>
                <Text style={styles.logoLeaf}>Leaf</Text>
                <Text style={styles.tagline}>Belt Monitoring System</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to monitor your belt</Text>

            {/* Input Fields */}
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

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Powered by Tea Bi Technology</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9", // Tea Bi mint background
        paddingHorizontal: 30,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    logoText: {
        fontSize: 48,
        fontWeight: "300",
        color: "#2E7D32",
        letterSpacing: 3,
    },
    logoLeaf: {
        fontSize: 44,
        color: "#2E7D32",
        marginTop: -12,
    },
    tagline: {
        fontSize: 16,
        color: "#1B5E20",
        marginTop: 10,
        fontWeight: "500",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1B5E20",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#4CAF50",
        textAlign: "center",
        marginBottom: 40,
        fontWeight: "500",
    },
    input: {
        height: 56,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 17,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButton: {
        height: 58,
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
        fontSize: 20,
        fontWeight: "600",
    },
    footerText: {
        textAlign: "center",
        marginTop: 40,
        color: "#666",
        fontSize: 14,
    },
});