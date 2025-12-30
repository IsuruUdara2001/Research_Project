import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Modal,
    ScrollView,
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import BottomNav from "../components/BottomNav";

const COLORS = {
    background: "#E8F5E9",
    card: "#FFFFFF",
    primary: "#4CAF50",
    success: "#4CAF50",
    warning: "#F59E0B",
    danger: "#EF4444",
    textDark: "#1B5E20",
    textMedium: "#2E7D32",
    textLight: "#558B2F",
    border: "#A5D6A7",
    lightGray: "#F1F5F9",
    accent: "#2E7D32",
};

function cleanValue(value, unit) {
    if (!value && value !== 0) return "-";
    let str = String(value).toLowerCase();
    return str.replace(unit.toLowerCase(), "").trim() + unit;
}

// Date Picker Modal
const DatePickerModal = ({ visible, onClose, onSelect, title }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={pickerStyles.overlay}>
                <View style={pickerStyles.modal}>
                    <View style={pickerStyles.header}>
                        <Text style={pickerStyles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={pickerStyles.closeButton}>
                            <Ionicons name="close" size={24} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>

                    <View style={pickerStyles.pickerRow}>
                        <View style={pickerStyles.pickerColumn}>
                            <Text style={pickerStyles.label}>Day</Text>
                            <ScrollView style={pickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                                {days.map(day => (
                                    <TouchableOpacity
                                        key={day}
                                        style={[pickerStyles.option, selectedDate.getDate() === day && pickerStyles.selectedOption]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setDate(day);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[pickerStyles.optionText, selectedDate.getDate() === day && pickerStyles.selectedOptionText]}>
                                            {day}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={pickerStyles.pickerColumn}>
                            <Text style={pickerStyles.label}>Month</Text>
                            <ScrollView style={pickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                                {months.map((month, idx) => (
                                    <TouchableOpacity
                                        key={month}
                                        style={[pickerStyles.option, selectedDate.getMonth() === idx && pickerStyles.selectedOption]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setMonth(idx);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[pickerStyles.optionText, selectedDate.getMonth() === idx && pickerStyles.selectedOptionText]}>
                                            {month.substring(0, 3)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={pickerStyles.pickerColumn}>
                            <Text style={pickerStyles.label}>Year</Text>
                            <ScrollView style={pickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                                {years.map(year => (
                                    <TouchableOpacity
                                        key={year}
                                        style={[pickerStyles.option, selectedDate.getFullYear() === year && pickerStyles.selectedOption]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setFullYear(year);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[pickerStyles.optionText, selectedDate.getFullYear() === year && pickerStyles.selectedOptionText]}>
                                            {year}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={pickerStyles.buttonRow}>
                        <TouchableOpacity style={pickerStyles.cancelButton} onPress={onClose}>
                            <Text style={pickerStyles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={pickerStyles.confirmButton} onPress={() => { onSelect(selectedDate); onClose(); }}>
                            <Text style={pickerStyles.confirmButtonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Month Picker Modal
const MonthPickerModal = ({ visible, onClose, onSelect, title }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={pickerStyles.overlay}>
                <View style={pickerStyles.modal}>
                    <View style={pickerStyles.header}>
                        <Text style={pickerStyles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={pickerStyles.closeButton}>
                            <Ionicons name="close" size={24} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>

                    <View style={pickerStyles.pickerRow}>
                        <View style={pickerStyles.pickerColumn}>
                            <Text style={pickerStyles.label}>Month</Text>
                            <ScrollView style={pickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                                {months.map((month, idx) => (
                                    <TouchableOpacity
                                        key={month}
                                        style={[pickerStyles.option, selectedDate.getMonth() === idx && pickerStyles.selectedOption]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setMonth(idx);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[pickerStyles.optionText, selectedDate.getMonth() === idx && pickerStyles.selectedOptionText]}>
                                            {month}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={pickerStyles.pickerColumn}>
                            <Text style={pickerStyles.label}>Year</Text>
                            <ScrollView style={pickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                                {years.map(year => (
                                    <TouchableOpacity
                                        key={year}
                                        style={[pickerStyles.option, selectedDate.getFullYear() === year && pickerStyles.selectedOption]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setFullYear(year);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[pickerStyles.optionText, selectedDate.getFullYear() === year && pickerStyles.selectedOptionText]}>
                                            {year}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={pickerStyles.buttonRow}>
                        <TouchableOpacity style={pickerStyles.cancelButton} onPress={onClose}>
                            <Text style={pickerStyles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={pickerStyles.confirmButton} onPress={() => { onSelect(selectedDate); onClose(); }}>
                            <Text style={pickerStyles.confirmButtonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState(null);
    const [monthFilter, setMonthFilter] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "history"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHistory(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching history:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading history...</Text>
            </View>
        );
    }

    const isDesktop = dimensions.width > 768;
    const padding = isDesktop ? 32 : 20;

    const filteredHistory = history.filter(item => {
        const matchStatus = statusFilter === "ALL" || item.overall_status === statusFilter;
        if (!item.timestamp || !item.timestamp.seconds) return matchStatus;

        const itemDate = new Date(item.timestamp.seconds * 1000);
        let matchDate = true;
        if (dateFilter) {
            matchDate = (
                itemDate.getDate() === dateFilter.getDate() &&
                itemDate.getMonth() === dateFilter.getMonth() &&
                itemDate.getFullYear() === dateFilter.getFullYear()
            );
        }

        let matchMonth = true;
        if (monthFilter) {
            matchMonth = (
                itemDate.getMonth() === monthFilter.getMonth() &&
                itemDate.getFullYear() === monthFilter.getFullYear()
            );
        }

        return matchStatus && matchDate && matchMonth;
    });

    const handleDateSelect = (date) => { setDateFilter(date); setMonthFilter(null); };
    const handleMonthSelect = (date) => { setMonthFilter(date); setDateFilter(null); };
    const clearFilters = () => { setDateFilter(null); setMonthFilter(null); };

    const getStatusColor = (status) => {
        switch (status) {
            case "CRITICAL": return COLORS.danger;
            case "WARNING": return COLORS.warning;
            case "NORMAL": return COLORS.success;
            default: return COLORS.textLight;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "CRITICAL": return "alert-circle";
            case "WARNING": return "warning";
            case "NORMAL": return "checkmark-circle";
            default: return "help-circle";
        }
    };

    const renderItem = ({ item }) => {
        const temp = cleanValue(item.temp, "°C");
        const vibration = cleanValue(item.vibration, "g");
        const rpm = item.rpm ?? "-";
        const status = item.overall_status || "UNKNOWN";
        const statusColor = getStatusColor(status);
        const date = new Date(item.timestamp.seconds * 1000);

        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.dateTimeSection}>
                        <Text style={styles.dateText}>{dateStr}</Text>
                        <Text style={styles.timeText}>{timeStr}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                        <Ionicons name={getStatusIcon(status)} size={16} color="#FFF" />
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>

                <View style={styles.metricsContainer}>
                    <View style={styles.metricBox}>
                        <View style={styles.metricIcon}>
                            <Text style={styles.metricEmoji}>🌡️</Text>
                        </View>
                        <View style={styles.metricDetails}>
                            <Text style={styles.metricLabel}>Temp</Text>
                            <Text style={styles.metricValue}>{temp}</Text>
                        </View>
                    </View>

                    <View style={styles.metricBox}>
                        <View style={styles.metricIcon}>
                            <Text style={styles.metricEmoji}>📳</Text>
                        </View>
                        <View style={styles.metricDetails}>
                            <Text style={styles.metricLabel}>Vibration</Text>
                            <Text style={styles.metricValue}>{vibration}</Text>
                        </View>
                    </View>

                    <View style={styles.metricBox}>
                        <View style={styles.metricIcon}>
                            <Text style={styles.metricEmoji}>⚙️</Text>
                        </View>
                        <View style={styles.metricDetails}>
                            <Text style={styles.metricLabel}>RPM</Text>
                            <Text style={styles.metricValue}>{rpm}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
                <View style={[styles.header, { paddingHorizontal: padding }]}>
                    <View>
                        <Text style={styles.title}>History</Text>
                        <Text style={styles.subtitle}>
                            {filteredHistory.length} record{filteredHistory.length !== 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>

                <View style={[styles.filtersCard, { marginHorizontal: padding }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
                        {["ALL", "NORMAL", "WARNING", "CRITICAL"].map(s => {
                            const colors = { ALL: COLORS.accent, NORMAL: COLORS.success, WARNING: COLORS.warning, CRITICAL: COLORS.danger };
                            return (
                                <TouchableOpacity
                                    key={s}
                                    style={[styles.filterChip, statusFilter === s && { backgroundColor: colors[s] }]}
                                    onPress={() => setStatusFilter(s)}
                                >
                                    <Text style={[styles.filterChipText, statusFilter === s && styles.filterChipTextActive]}>
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        <View style={styles.filterDivider} />

                        <TouchableOpacity
                            style={[styles.filterChip, dateFilter && { backgroundColor: COLORS.primary }]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar" size={16} color={dateFilter ? "#FFF" : COLORS.textDark} />
                            {dateFilter && <Text style={styles.filterChipTextActive}>{dateFilter.getDate()}/{dateFilter.getMonth() + 1}</Text>}
                            {!dateFilter && <Text style={styles.filterChipText}>Date</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.filterChip, monthFilter && { backgroundColor: COLORS.primary }]}
                            onPress={() => setShowMonthPicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={16} color={monthFilter ? "#FFF" : COLORS.textDark} />
                            {monthFilter && <Text style={styles.filterChipTextActive}>{monthFilter.getMonth() + 1}/{monthFilter.getFullYear()}</Text>}
                            {!monthFilter && <Text style={styles.filterChipText}>Month</Text>}
                        </TouchableOpacity>

                        {(dateFilter || monthFilter) && (
                            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                                <Ionicons name="close-circle" size={20} color={COLORS.danger} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                <DatePickerModal visible={showDatePicker} onClose={() => setShowDatePicker(false)} onSelect={handleDateSelect} title="Select Date" />
                <MonthPickerModal visible={showMonthPicker} onClose={() => setShowMonthPicker(false)} onSelect={handleMonthSelect} title="Select Month" />

                <FlatList
                    data={filteredHistory}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={[styles.listContent, { paddingHorizontal: padding, paddingBottom: 100 }]}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIcon}>
                                <Ionicons name="file-tray-outline" size={64} color={COLORS.textLight} />
                            </View>
                            <Text style={styles.emptyText}>No Records Found</Text>
                            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                        </View>
                    }
                />
            </View>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    contentWrapper: {
        flex: 1,
        width: '100%'
    },
    contentWrapperDesktop: {
        maxWidth: 1200,
        alignSelf: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: "600"
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.textDark
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 4,
        fontWeight: "500"
    },
    filtersCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3
    },
    filtersScroll: {
        gap: 10,
        alignItems: "center"
    },
    filterChip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    filterChipText: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.textDark
    },
    filterChipTextActive: {
        fontSize: 13,
        fontWeight: "700",
        color: "#FFF"
    },
    filterDivider: {
        width: 2,
        height: 30,
        backgroundColor: COLORS.border
    },
    clearButton: {
        paddingHorizontal: 10
    },
    listContent: {
        paddingTop: 10
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.border
    },
    dateTimeSection: {},
    dateText: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 4
    },
    timeText: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: "500"
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        gap: 6
    },
    statusText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#FFF",
        letterSpacing: 0.5
    },
    metricsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap"
    },
    metricBox: {
        flex: 1,
        minWidth: 100,
        alignItems: "center"
    },
    metricIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8
    },
    metricEmoji: {
        fontSize: 24
    },
    metricDetails: {
        alignItems: "center"
    },
    metricLabel: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 4,
        fontWeight: "600",
        textAlign: "center"
    },
    metricValue: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.textDark,
        textAlign: "center"
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80
    },
    emptyIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 8
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: "center"
    }
});

const pickerStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 24,
        width: '90%',
        maxWidth: 450,
        maxHeight: '75%',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textDark,
        flex: 1
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        gap: 8
    },
    pickerColumn: {
        flex: 1
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 10,
        textAlign: 'center'
    },
    scrollContainer: {
        maxHeight: 220,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray
    },
    option: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    selectedOption: {
        backgroundColor: COLORS.primary
    },
    optionText: {
        fontSize: 14,
        color: COLORS.textDark,
        textAlign: 'center',
        fontWeight: '500'
    },
    selectedOptionText: {
        color: '#FFF',
        fontWeight: '700'
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray,
        borderWidth: 2,
        borderColor: COLORS.border
    },
    cancelButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDark
    },
    confirmButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary
    },
    confirmButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF'
    }
});