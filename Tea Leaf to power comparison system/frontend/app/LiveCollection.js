import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput 
} from 'react-native';
import { Link } from "expo-router";

export default function LiveCollection() {
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [iotWeight, setIotWeight] = useState('');
 const [newFarmerID, setNewFarmerID] = useState('');
const [newWeight, setNewWeight] = useState('');


const [collections, setCollections] = useState([]);
    // -----------------------------------------------------
  // 🔥 FETCH DATA FROM FIREBASE BACKEND
  // -----------------------------------------------------
const fetchCollections = () => {
  fetch("http://192.168.244.112:8000/api/leaf")
    .then(res => res.json())
    .then(data => {
      console.log("🔥 Loaded Firebase Data:", data);

      const formatted = data.map((item, index) => ({
        id: index + 1,
         leaf_id: item.leaf_id,
        farmer_id: item.farmer_id,
        name: item.farmer_name,
        location: item.village_location,
        weight: item.leaf_weight,
        // ✅ Combine date and time
        time: item.timestamp
          ? new Date(item.timestamp).toLocaleString([], {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        initial: item.farmer_name ? item.farmer_name[0].toUpperCase() : "?",
        color: "#10b981",
      }));

      setCollections(formatted);
    })
    .catch(err => {
      console.error("❌ Fetch error:", err);
    });
};
 

  useEffect(() => {
    fetchCollections();
  }, []);

  // -----------------------------------------------------
  // UI Logic
  // -----------------------------------------------------

  const toggleSelection = (id) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter(item => item !== id));
    } else {
      setSelectedCollections([...selectedCollections, id]);
    }
  };

  const selectAll = () => {
    if (selectedCollections.length === collections.length) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(collections.map(c => c.id));
    }
  };


  
const createBatch = () => {
  if (selectedCollections.length === 0) {
    Alert.alert("No Selection", "Select at least one collection");
    return;
  }

  const selected = collections.filter(c =>
    selectedCollections.includes(c.id)
  );

  const payload = selected.map(c => ({
    leaf_id: c.leaf_id,   
    farmer_id: c.farmer_id,
    farmer_name: c.name,
    village_location: c.location,
    leaf_weight: Number(c.weight),
  }));

  console.log("📦 PAYLOAD:", payload);

  fetch("http://192.168.244.112:8000/api/createBatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collections: payload }),
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(t => {
          throw new Error(`HTTP ${res.status}: ${t}`);
        });
      }
      return res.json();
    })
    .then(data => {
      console.log("✅ Batch Created:", data);
      Alert.alert("Batch Created", `Batch ID: ${data.batch.id}`);
      setSelectedCollections([]);
    })
    .catch(err => {
      console.error("❌ Create batch error:", err.message);
      Alert.alert("Error", err.message);
    });
};



const openManualEntry = () => {
  fetch("http://192.168.244.112:8000/api/iot/weight/latest")
  .then(res => res.json())
  .then(data => {
    console.log("🔥 Latest IoT weight:", data);
    setIotWeight(String(data.weight_value));
  })
  .catch(err => console.error("IoT fetch error", err));


  setManualModalVisible(true);
};

  

 // -----------------------------------------------------
  // 🔥 SAVE MANUAL ENTRY TO BACKEND + REFRESH LIST
  // -----------------------------------------------------
 const saveManualEntry = () => {
  // Validate inputs
  if (!newFarmerID.trim() || !iotWeight) {
  Alert.alert('Missing Data', 'Farmer ID or IoT weight missing.');
  return;
}

  if (isNaN(newWeight.trim())) {
    Alert.alert('Invalid Weight', 'Please enter a valid numeric weight.');
    return;
  }

  // Prepare payload
  const payload = {
    farmer_id: newFarmerID.trim(),       // only farmer ID
    leaf_weight: Number(iotWeight), // ✅ IoT weight  // leaf weight as number
  };

  // Send to backend
  fetch("http://192.168.244.112:8000/api/leaf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Added to Firebase:", data);
      Alert.alert(
  "Leaf Entry Added",
  `Added ${iotWeight} kg for Farmer ID ${newFarmerID}`
);

      
      // Refresh the list
      fetchCollections();
    })
    .catch(err => {
      console.error("❌ Error:", err);
      Alert.alert("Error", "Failed to send data to server.");
    });

  // 4Clear form and close modal
  setManualModalVisible(false);
  setNewFarmerID('');   // clear input
  setNewWeight('');
};


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Leaf Collection</Text>
          <Text style={styles.headerSubtitle}>Real-time load cell monitoring</Text>
        </View>

        {/* Active Collections Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Collections</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          {/* ✅ Add Manual Entry Button */}
          <TouchableOpacity style={styles.addManualButton} onPress={openManualEntry}>
            <Text style={styles.addManualButtonText}>➕ Add Manual Entry</Text>
          </TouchableOpacity>

          {/* Collection Cards */}
          {collections.map((collection) => (
            <TouchableOpacity
              key={collection.id}
              style={[
                styles.collectionCard,
                selectedCollections.includes(collection.id) && styles.selectedCard
              ]}
              onPress={() => toggleSelection(collection.id)}
            >
              {/* Checkbox */}
              <View style={styles.checkbox}>
                {selectedCollections.includes(collection.id) && (
                  <View style={styles.checkboxChecked} />
                )}
              </View>

              <View style={styles.cardContent}>
                {/* Header Row */}
                <View style={styles.cardHeader}>
                  <View style={styles.cardLeft}>
                    <View style={[styles.avatar, { backgroundColor: collection.color }]}>
                      <Text style={styles.avatarText}>{collection.initial}</Text>
                    </View>
                    <View>
                      <Text style={styles.farmerName}>{collection.name}</Text>
                      <View style={styles.locationRow}>
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.locationText}>{collection.location}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={styles.timeText}>{collection.time}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Collecting</Text>
                    </View>
                  </View>
                </View>

                {/* Weight Row */}
                <View style={styles.weightRow}>
                  <View style={styles.weightLeft}>
                    <Text style={styles.weightIcon}>⚖️</Text>
                    <Text style={styles.weightLabel}>Current Weight</Text>
                  </View>
                  <Text style={styles.weightValue}>{collection.weight} kg</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Batch Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Batch Management</Text>
          
          <View style={styles.selectionRow}>
            <Text style={styles.selectionLabel}>Selected Collections</Text>
            <Text style={styles.selectionCount}>
              {selectedCollections.length} / {collections.length}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.selectAllButton} onPress={selectAll}>
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.createBatchButton,
                selectedCollections.length === 0 && styles.createBatchButtonDisabled
              ]}
              onPress={createBatch}
              disabled={selectedCollections.length === 0}
            >
              <Text style={styles.createBatchText}>Create Batch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
       <Link href="/Dashboard" style={styles.navItem}>
                   <Text style={styles.navIcon}>🏠</Text>
                 
                 </Link>
       
                 <Link href="/LiveCollection" style={styles.navItem}>
                   <Text style={styles.navIcon}>⚖️</Text>
                   
                 </Link>
       
                 <Link href="/ActiveBatches" style={styles.navItem}>
                   <Text style={styles.navIcon}>📦</  Text>
                 
                 </Link>
       
                 <Link href="/CompletedBatches" style={styles.navItem}>
                   <Text style={styles.navIcon}>📊</Text>
        </Link>
      </View>

      {/* ✅ Manual Entry Modal */}
      <Modal
        visible={manualModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setManualModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Manual Entry</Text>

            <TextInput
              style={styles.input}
              placeholder="Farmer id"
              value={newFarmerID}
              onChangeText={setNewFarmerID}
            />
           
           <TextInput
  style={styles.input}
  value={iotWeight}
  editable={false}   // 🔒 user cannot edit
/>


            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveManualEntry}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setManualModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  header: { backgroundColor: '#10b981', padding: 24, paddingTop: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#fff', opacity: 0.9 },
  section: { backgroundColor: '#fff', margin: 12, marginTop: 16, borderRadius: 12, padding: 16, elevation: 3 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  liveIndicator: { flexDirection: 'row', alignItems: 'center' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981', marginRight: 6 },
  liveText: { fontSize: 12, color: '#10b981', fontWeight: '600' },
  addManualButton: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  addManualButtonText: { color: '#fff', fontWeight: '600' },
  collectionCard: { flexDirection: 'row', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  selectedCard: { borderColor: '#10b981', borderWidth: 2, backgroundColor: '#f0fdf4' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#d1d5db', marginRight: 12, marginTop: 4, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { width: 12, height: 12, borderRadius: 2, backgroundColor: '#10b981' },
  cardContent: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  farmerName: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#6b7280' },
  cardRight: { alignItems: 'flex-end' },
  timeText: { fontSize: 12, color: '#6b7280', marginBottom: 6 },
  statusBadge: { backgroundColor: '#10b981', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  weightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', padding: 12, borderRadius: 8 },
  weightLeft: { flexDirection: 'row', alignItems: 'center' },
  weightValue: { fontSize: 20, fontWeight: 'bold', color: '#10b981' },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  selectionLabel: { fontSize: 14, color: '#6b7280' },
  selectionCount: { fontSize: 18, fontWeight: 'bold', color: '#10b981' },
  buttonRow: { flexDirection: 'row', gap: 12 },
  selectAllButton: { flex: 1, backgroundColor: '#fff', borderWidth: 2, borderColor: '#10b981', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  createBatchButton: { flex: 1, backgroundColor: '#6b7280', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  createBatchButtonDisabled: { backgroundColor: '#d1d5db' },
  createBatchText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcon: { fontSize: 40, marginBottom: 4 },
  navLabel: { fontSize: 12, color: '#6b7280' },
  activeNav: { color: '#10b981', fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#10b981', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  cancelButton: { backgroundColor: '#ccc', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelText: { color: '#333', fontWeight: 'bold' },
});
