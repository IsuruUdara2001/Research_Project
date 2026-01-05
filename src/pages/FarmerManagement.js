import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FarmerManagement({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farmer Management</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.center}>
        <Text style={styles.removedText}>Farmer Management has been removed.</Text>
        <Text style={styles.infoText}>This feature was removed per your request.</Text>
      </View>
    </SafeAreaView>
  );

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const handleAddFarmer = () => {
    if (!formData.farmerId || !formData.farmerName || !formData.dailySupply) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newFarmer = {
      id: Date.now().toString(),
      farmerId: formData.farmerId,
      farmerName: formData.farmerName,
      date: formatDate(formData.date),
      dailySupply: formData.dailySupply,
    };

    setFarmers([...farmers, newFarmer]);
    setFormData({
      farmerId: "",
      farmerName: "",
      date: new Date(),
      dailySupply: "",
    });
    setShowAddModal(false);
    Alert.alert("Success", "Farmer record added successfully");
  };

  const handleDeleteFarmer = (id) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setFarmers(farmers.filter((farmer) => farmer.id !== id));
            Alert.alert("Success", "Record deleted successfully");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farmer Management</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.addButtonText}>Add New Record</Text>
        </TouchableOpacity>

        {/* Records List */}
        {farmers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#A8B5AD" />
            <Text style={styles.emptyStateText}>No records yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first farmer record
            </Text>
          </View>
        ) : (
          <View style={styles.recordsList}>
            {farmers.map((farmer) => (
              <View key={farmer.id} style={[styles.recordCard, { marginBottom: 16 }]}>
                <View style={styles.recordHeader}>
                  <View style={styles.recordIdBadge}>
                    <Text style={styles.recordIdText}>#{farmer.farmerId}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteFarmer(farmer.id)}
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={20} color="#E53935" />
                  </TouchableOpacity>
                </View>

                <View style={styles.recordContent}>
                  <View style={styles.recordRow}>
                    <Ionicons name="person-outline" size={18} color="#6B9B8A" style={{ marginRight: 8 }} />
                    <Text style={styles.recordLabel}>Name:</Text>
                    <Text style={styles.recordValue}>{farmer.farmerName}</Text>
                  </View>

                  <View style={styles.recordRow}>
                    <Ionicons name="calendar-outline" size={18} color="#6B9B8A" style={{ marginRight: 8 }} />
                    <Text style={styles.recordLabel}>Date:</Text>
                    <Text style={styles.recordValue}>{farmer.date}</Text>
                  </View>

                  <View style={styles.recordRow}>
                    <Ionicons name="scale-outline" size={18} color="#6B9B8A" style={{ marginRight: 8 }} />
                    <Text style={styles.recordLabel}>Supply:</Text>
                    <Text style={styles.recordValue}>{farmer.dailySupply} kg</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Farmer Record</Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#2C2C2C" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              {/* Farmer ID */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Farmer ID</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="card-outline"
                    size={20}
                    color="#6B9B8A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={formData.farmerId}
                    onChangeText={(text) =>
                      setFormData({ ...formData, farmerId: text })
                    }
                    placeholder="Enter farmer ID"
                    placeholderTextColor="#A8B5AD"
                  />
                </View>
              </View>

              {/* Farmer Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Farmer Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#6B9B8A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={formData.farmerName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, farmerName: text })
                    }
                    placeholder="Enter farmer name"
                    placeholderTextColor="#A8B5AD"
                  />
                </View>
              </View>

              {/* Date Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.dateSelector}
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#6B9B8A"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.dateSelectorText}>
                    {formatDate(formData.date)}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color="#6B9B8A"
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  // ensure the picker text is visible (black) on light backgrounds
                  textColor="#000000"
                />
              )}

              {/* Daily Supply */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Daily Supply (kg)</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="scale-outline"
                    size={20}
                    color="#6B9B8A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={formData.dailySupply}
                    onChangeText={(text) =>
                      setFormData({ ...formData, dailySupply: text })
                    }
                    placeholder="Enter supply in kg"
                    placeholderTextColor="#A8B5AD"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddFarmer}
                activeOpacity={0.85}
              >
                <Text style={styles.submitButtonText}>Add Record</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  removedText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#7A8A80",
    marginTop: 8,
  },
  recordsList: {},
  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5F3",
  },
  recordIdBadge: {
    backgroundColor: "#F0F5F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  recordIdText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B9B8A",
  },
  deleteButton: {
    padding: 8,
  },
  recordContent: {},
  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recordLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7A8A80",
    width: 60,
  },
  recordValue: {
    fontSize: 14,
    color: "#2C2C2C",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FAFAF5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  closeButton: {
    padding: 4,
  },
  modalForm: {
    padding: 24,
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
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 44,
    paddingRight: 14,
    paddingVertical: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
  },
  dateSelectorText: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  chevronIcon: {
    marginLeft: 8,
  },
  submitButton: {
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
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
