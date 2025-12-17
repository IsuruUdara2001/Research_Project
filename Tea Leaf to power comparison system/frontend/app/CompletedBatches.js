import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function CompletedBatches() {
  const batches = [
    {
      id: 'BATCH-2025-000',
      date: '2025-10-21',
      totalWeight: 620.5,
      timeDuration: '06:00 AM - 11:45 AM',
      predictedOutput: 124.1,
      actualOutput: 127.8,
      variance: 3.7,
      variancePercent: 2.98,
      expectedYield: 20,
      actualYield: 20.6,
      status: 'excellent',
      statusColor: '#10b981',
    },
    {
      id: 'BATCH-2024-999',
      date: '2025-10-20',
      totalWeight: 580.3,
      timeDuration: '07:30 AM - 12:15 PM',
      predictedOutput: 116.1,
      actualOutput: 107.3,
      variance: -8.8,
      variancePercent: -7.59,
      expectedYield: 20,
      actualYield: 18.5,
      status: 'below',
      statusColor: '#ef4444',
    },
  ];

  const getStatusInfo = (status) => {
    if (status === 'excellent') {
      return {
        icon: '✓',
        title: 'Excellent Performance',
        message: 'Actual output exceeded prediction. Processing efficiency was optimal.',
      };
    } else {
      return {
        icon: '⚠',
        title: 'Below Expected',
        message: 'Actual output was below prediction. Review processing parameters.',
      };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Completed Batches</Text>
          <Text style={styles.headerSubtitle}>Results & Analysis</Text>
        </View>

        {/* Batch Cards */}
        {batches.map((batch) => {
          const statusInfo = getStatusInfo(batch.status);
          
          return (
            <View key={batch.id} style={styles.batchCard}>
              {/* Batch Header */}
              <View style={[styles.batchHeader, { backgroundColor: batch.statusColor }]}>
                <View>
                  <Text style={styles.batchId}>{batch.id}</Text>
                  <View style={styles.dateRow}>
                    <Text style={styles.calendarIcon}>📅</Text>
                    <Text style={styles.dateText}>{batch.date}</Text>
                  </View>
                </View>
                <View style={styles.checkmarkCircle}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              </View>

              {/* Weight and Duration */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Total Leaf Weight</Text>
                  <Text style={styles.infoValue}>{batch.totalWeight} kg</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Time Duration</Text>
                  <Text style={styles.infoValue}>{batch.timeDuration}</Text>
                </View>
              </View>

              {/* Predicted vs Actual Comparison */}
              <View style={styles.comparisonSection}>
                <View style={styles.comparisonHeader}>
                  <Text style={styles.chartIcon}>📊</Text>
                  <Text style={styles.comparisonTitle}>Predicted vs Actual Comparison</Text>
                </View>

                <View style={styles.comparisonRow}>
                  <Text style={styles.comparisonLabel}>Predicted Output</Text>
                  <Text style={styles.comparisonValue}>{batch.predictedOutput} kg</Text>
                </View>

                <View style={styles.comparisonRow}>
                  <Text style={styles.comparisonLabel}>Actual Output</Text>
                  <Text style={[styles.comparisonValue, styles.boldText]}>{batch.actualOutput} kg</Text>
                </View>

                <View style={styles.comparisonRow}>
                  <Text style={styles.comparisonLabel}>Variance</Text>
                  <Text style={[
                    styles.comparisonValue,
                    batch.variance > 0 ? styles.greenText : styles.redText
                  ]}>
                    {batch.variance > 0 ? '+' : ''}{batch.variance} kg ({batch.variance > 0 ? '+' : ''}{batch.variancePercent}%)
                  </Text>
                </View>
              </View>

              {/* Yield Performance */}
              <View style={styles.yieldSection}>
                <Text style={styles.yieldTitle}>Yield Performance</Text>

                <View style={styles.yieldRow}>
                  <Text style={styles.yieldLabel}>Expected Yield</Text>
                  <Text style={styles.yieldValue}>{batch.expectedYield}%</Text>
                </View>

                <View style={styles.yieldRow}>
                  <Text style={styles.yieldLabel}>Actual Yield</Text>
                  <Text style={[styles.yieldValue, styles.boldText, styles.greenText]}>
                    {batch.actualYield}%
                  </Text>
                </View>
              </View>

              {/* Status Alert */}
              <View style={[
                styles.statusAlert,
                { backgroundColor: batch.status === 'excellent' ? '#d1fae5' : '#fee2e2' }
              ]}>
                <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
                <View style={styles.statusContent}>
                  <Text style={[
                    styles.statusTitle,
                    { color: batch.status === 'excellent' ? '#065f46' : '#991b1b' }
                  ]}>
                    {statusInfo.title}
                  </Text>
                  <Text style={[
                    styles.statusMessage,
                    { color: batch.status === 'excellent' ? '#065f46' : '#991b1b' }
                  ]}>
                    {statusInfo.message}
                  </Text>
                </View>
              </View>

              {/* View Detailed Report Button */}
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>View Detailed Report</Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
    backgroundColor: '#3b82f6',
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  dateText: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
  },
  checkmarkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  comparisonSection: {
    backgroundColor: '#eff6ff',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  comparisonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  comparisonValue: {
    fontSize: 14,
    color: '#3b82f6',
  },
  boldText: {
    fontWeight: '600',
  },
  greenText: {
    color: '#10b981',
  },
  redText: {
    color: '#ef4444',
  },
  yieldSection: {
    backgroundColor: '#faf5ff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
  },
  yieldTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  yieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  yieldLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  yieldValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  statusAlert: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
  },
  statusIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusMessage: {
    fontSize: 13,
    lineHeight: 18,
  },
  reportButton: {
    margin: 16,
    marginTop: 0,
    paddingVertical: 14,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4b5563',
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
    color: '#3b82f6',
    fontWeight: '600',
  },
});