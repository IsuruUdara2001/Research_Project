import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TeaBiLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Manager");
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = ["Manager", "Researcher", "Admin", "Assistant"];

  const handleLogin = () => {
    if (email && password && role) {
      Alert.alert("Login Successful", `Email: ${email}\nRole: ${role}`, [
        {
          text: "OK",
          onPress: () => navigation.navigate("MenuPage"),
        },
      ]);
      console.log("Login:", { email, password, role });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
      </TouchableOpacity>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome Back!</Text>
        <Text style={styles.welcomeSubtitle}>Log in to continue</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        {/* Email Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#6B9B8A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#A8B5AD"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#6B9B8A"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, styles.inputWithRightIcon]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#A8B5AD"
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B9B8A"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Select Your Role */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Your Role</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#6B9B8A"
              style={styles.inputIcon}
            />
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <Text style={styles.dropdownText}>{role}</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color="#6B9B8A"
                style={[
                  styles.chevronIcon,
                  showRoleDropdown && styles.chevronIconRotated,
                ]}
              />
            </TouchableOpacity>
          </View>

          {showRoleDropdown && (
            <View style={styles.dropdownMenu}>
              {roles.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.dropdownItem,
                    role === r && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setRole(r);
                    setShowRoleDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      role === r && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    marginTop: 18,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#7A8A80",
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 44,
    paddingRight: 14,
    paddingVertical: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    fontSize: 15,
    color: "#2C2C2C",
  },
  inputWithRightIcon: {
    paddingRight: 44,
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
    padding: 4,
  },
  dropdownButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 44,
    paddingRight: 14,
    paddingVertical: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: "#2C2C2C",
  },
  chevronIcon: {
    transition: "transform 0.3s",
  },
  chevronIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dropdownItemSelected: {
    backgroundColor: "#F0F5F3",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#2C2C2C",
  },
  dropdownItemTextSelected: {
    color: "#6B9B8A",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#6B9B8A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});