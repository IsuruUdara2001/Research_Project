import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function ActiveBatches() {
  const router = useRouter();
  const [batches, setBatches] = useState([]);


 

  // 🔥 Fetch active batches from backend
   useEffect(() => {
    const loadBatchesWithPrediction = async () => {
      try {
        const res = await fetch("http://192.168.144.1:8000/api/activeBatches");
        const data = await res.json();

        console.log("🔥 Active Batches:", data);

       const formatted = data.map(b => ({
  id: b.id,
  startTime: new Date(b.startTime + "Z").toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  status: b.status,
  statusColor: b.isProcessing ? "#f59e0b" : "#10b981",
  collections: b.collections || [],
  totalWeight: b.totalWeight,

  // ✅ READ FROM DB
  predictedOutput: b.predictedOutput,
  expectedYield: b.expectedYield,

  isProcessing: b.isProcessing,
}));


        setBatches(formatted);
      } catch (err) {
        console.error("❌ Error loading batches:", err);
      }
    };

    loadBatchesWithPrediction();
  }, []);

  const handleSetReady = async (batch) => {
  try {
    const response = await fetch(`http://192.168.144.1:8000/api/updateBatchStatus/${batch.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("Ready")

    });

    const data = await response.json();
    console.log(data);

    // Update UI locally
    setBatches(prev => prev.map(b => 
      b.id === batch.id 
        ? { ...b, status: "Ready", isProcessing: false, statusColor: "#10b981" } 
        : b
    ));
  } catch (err) {
    console.error("❌ Error setting batch ready:", err);
  }
};




  const handleRecordOutput = (batch) => {
    // Navigate to Record Output screen with batch data
    router.push({
      pathname: '/Factorymnleaf/RecordOutput',
      params: {
        batchId: batch.id,
        totalWeight: batch.totalWeight,
        predictedOutput: batch.predictedOutput,
        expectedYield: batch.expectedYield,
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Active Batches</Text>
          <Text style={styles.headerSubtitle}>Processing & Ready for output</Text>
        </View>

        {/* Batch Cards */}
        {batches.map((batch) => (
          <View key={batch.id} style={styles.batchCard}>
            {/* Batch Header */}
            <View style={[styles.batchHeader, { backgroundColor: batch.statusColor }]}>
              <View>
                <Text style={styles.batchId}>{batch.id}</Text>
                <View style={styles.startTimeRow}>
                  <Text style={styles.clockIcon}>🕐</Text>
                  <Text style={styles.startTime}>Started: {batch.startTime}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { 
                backgroundColor: batch.isProcessing ? '#fef3c7' : '#d1fae5' 
              }]}>
                <Text style={[styles.statusText, { 
                  color: batch.isProcessing ? '#92400e' : '#065f46' 
                }]}>
                  {batch.status}
                </Text>
              </View>
            </View>

            {/* Leaf Collections */}
            <View style={styles.collectionsSection}>
              <Text style={styles.collectionsTitle}>
                Leaf Collections ({batch.collections.length} farmers)
              </Text>
              
              {batch.collections.map((collection, index) => (
                <View key={index} style={styles.collectionRow}>
                  <View style={styles.collectionLeft}>
                    <Text style={styles.farmerIcon}>👤</Text>
                    <Text style={styles.farmerName}>{collection.farmer_name}</Text>
                  </View>
                  <View style={styles.collectionRight}>
                    <Text style={styles.collectionWeight}>{collection.weight} kg</Text>
                    <Text style={styles.collectionTime}>{collection.time}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Summary Section */}
            <View style={styles.summarySection}>
              {/* Total Weight */}
              <View style={[styles.summaryRow, styles.greenBg]}>
                <Text style={styles.summaryLabel}>Total Leaf Weight</Text>
                <Text style={[styles.summaryValue, styles.greenText]}>
                  {batch.totalWeight} kg
                </Text>
              </View>

              {/* Predicted Output */}
              <View style={[styles.summaryRow, styles.blueBg]}>
                <Text style={styles.summaryLabel}>Predicted Powder Output</Text>
                <Text style={[styles.summaryValue, styles.blueText]}>
                  {batch.predictedOutput} kg
                </Text>
              </View>

              {/* Expected Yield */}
              <View style={[styles.summaryRow, styles.purpleBg]}>
                <Text style={styles.summaryLabel}>Expected Yield</Text>
                <Text style={[styles.summaryValue, styles.purpleText]}>
                  {batch.expectedYield}%
                </Text>
              </View>
            </View>


            {/* Action Button Section */}
<View style={styles.actionSection}>
  {batch.isProcessing ? (
    <TouchableOpacity 
      style={styles.readyButton}
      onPress={() => handleSetReady(batch)}
    >
      <Text style={styles.readyButtonText}>Set Ready</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity 
      style={styles.recordButton}
      onPress={() => handleRecordOutput(batch)}
    >
      <Text style={styles.recordButtonIcon}>⚖️</Text>
      <Text style={styles.recordButtonText}>Record Powder Output</Text>
    </TouchableOpacity>
  )}
</View>


          


          </View>
        ))}
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
                               <Text style={styles.navIcon}>📦</Text>
                             
                             </Link>
                   
                             <Link href="/CompletedBatches" style={styles.navItem}>
                               <Text style={styles.navIcon}>📊</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ea580c',
    padding: 24,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  batchCard: {
    backgroundColor: '#ffffff',
    margin: 12,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  batchHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  startTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  startTime: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  collectionsSection: {
    padding: 16,
    paddingBottom: 8,
  },
  collectionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  collectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  farmerIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  farmerName: {
    fontSize: 14,
    color: '#1f2937',
  },
  collectionRight: {
    alignItems: 'flex-end',
  },
  collectionWeight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  collectionTime: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greenBg: {
    backgroundColor: '#f0fdf4',
  },
  blueBg: {
    backgroundColor: '#eff6ff',
  },
  purpleBg: {
    backgroundColor: '#faf5ff',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  greenText: {
    color: '#16a34a',
  },
  blueText: {
    color: '#3b82f6',
  },
  purpleText: {
    color: '#8b5cf6',
  },
  actionSection: {
    padding: 16,
    paddingTop: 0,
  },
  processingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  alertIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  alertText: {
    fontSize: 12,
    color: '#92400e',
    flex: 1,
  },
  readyButton: {
  backgroundColor: "#10b981",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
},
  recordButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
 readyButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 40,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  activeNav: {
    color: '#ea580c',
    fontWeight: '600',
  },
});