import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 28, marginBottom: 20 }}>Tea Bi</Text>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome Back!</Text>

      <Link
        href="/Dashboard"
        style={{
          backgroundColor: "#10b981",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Dashboard</Text>
      </Link>

    
      
    </View>
  );
}
