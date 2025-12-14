// History.js - Enhanced UI Version - Complete Code
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
    success: "#27AE60",
    warning: "#F39C12",
    danger: "#E74C3C",
    textDark: "#1B5E20",
    textLight: "#558B2F",
    border: "#C8E6C9",
    lightGray: "#F5F5F5"
};

// -----------------------------
// Clean duplicated units
// -----------------------------
function cleanValue(value, unit) {
    if (!value && value !== 0) return "-";
    let str = String(value).toLowerCase();
    return str.replace(unit.toLowerCase(), "").trim() + unit;
}

// -----------------------------
// Date Picker Modal (Day, Month, Year)
// -----------------------------
const DatePickerModal = ({ visible, onClose, onSelect, title }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
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
                                        style={[
                                            pickerStyles.option,
                                            selectedDate.getDate() === day && pickerStyles.selectedOption
                                        ]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setDate(day);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[
                                            pickerStyles.optionText,
                                            selectedDate.getDate() === day && pickerStyles.selectedOptionText
                                        ]}>
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
                                        style={[
                                            pickerStyles.option,
                                            selectedDate.getMonth() === idx && pickerStyles.selectedOption
                                        ]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setMonth(idx);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[
                                            pickerStyles.optionText,
                                            selectedDate.getMonth() === idx && pickerStyles.selectedOptionText
                                        ]}>
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
                                        style={[
                                            pickerStyles.option,
                                            selectedDate.getFullYear() === year && pickerStyles.selectedOption
                                        ]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setFullYear(year);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[
                                            pickerStyles.optionText,
                                            selectedDate.getFullYear() === year && pickerStyles.selectedOptionText
                                        ]}>
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
                        <TouchableOpacity
                            style={pickerStyles.confirmButton}
                            onPress={() => {
                                onSelect(selectedDate);
                                onClose();
                            }}
                        >
                            <Text style={pickerStyles.confirmButtonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// -----------------------------
// Month Picker Modal (Month, Year only)
// -----------------------------
const MonthPickerModal = ({ visible, onClose, onSelect, title }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
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
                                        style={[
                                            pickerStyles.option,
                                            selectedDate.getMonth() === idx && pickerStyles.selectedOption
                                        ]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setMonth(idx);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[
                                            pickerStyles.optionText,
                                            selectedDate.getMonth() === idx && pickerStyles.selectedOptionText
                                        ]}>
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
                                        style={[
                                            pickerStyles.option,
                                            selectedDate.getFullYear() === year && pickerStyles.selectedOption
                                        ]}
                                        onPress={() => {
                                            const newDate = new Date(selectedDate);
                                            newDate.setFullYear(year);
                                            setSelectedDate(newDate);
                                        }}
                                    >
                                        <Text style={[
                                            pickerStyles.optionText,
                                            selectedDate.getFullYear() === year && pickerStyles.selectedOptionText
                                        ]}>
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
                        <TouchableOpacity
                            style={pickerStyles.confirmButton}
                            onPress={() => {
                                onSelect(selectedDate);
                                onClose();
                            }}
                        >
                            <Text style={pickerStyles.confirmButtonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// -----------------------------
// Main Component
// -----------------------------
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
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
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
    const isTablet = dimensions.width > 600 && dimensions.width <= 768;
    const padding = isDesktop ? 32 : 16;

    // Filter history
    const filteredHistory = history.filter(item => {
        const matchStatus = statusFilter === "ALL" || item.overall_status === statusFilter;

        if (!item.timestamp || !item.timestamp.seconds) {
            return matchStatus;
        }

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

    const handleDateSelect = (date) => {
        setDateFilter(date);
        setMonthFilter(null);
    };

    const handleMonthSelect = (date) => {
        setMonthFilter(date);
        setDateFilter(null);
    };

    const clearFilters = () => {
        setDateFilter(null);
        setMonthFilter(null);
    };

    const getDateString = (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getMonthYearString = (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

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

        const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateRow}>
                            <Ionicons name="calendar-outline" size={16} color={COLORS.textLight} />
                            <Text style={styles.dateText}>{dateStr}</Text>
                        </View>
                        <View style={styles.timeRow}>
                            <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
                            <Text style={styles.timeText}>{timeStr}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                        <Ionicons name={getStatusIcon(status)} size={18} color={statusColor} />
                        <Text style={[styles.statusBadgeText, { color: statusColor }]}>{status}</Text>
                    </View>
                </View>

                <View style={styles.metricsRow}>
                    <View style={styles.metricItem}>
                        <View style={[styles.metricIconBox, { backgroundColor: '#E74C3C15' }]}>
                            <Ionicons name="thermometer-outline" size={20} color="#E74C3C" />
                        </View>
                        <View style={styles.metricInfo}>
                            <Text style={styles.metricLabel}>Temperature</Text>
                            <Text style={styles.metricValue}>{temp}</Text>
                        </View>
                    </View>

                    <View style={styles.metricItem}>
                        <View style={[styles.metricIconBox, { backgroundColor: '#9B59B615' }]}>
                            <Ionicons name="pulse-outline" size={20} color="#9B59B6" />
                        </View>
                        <View style={styles.metricInfo}>
                            <Text style={styles.metricLabel}>Vibration</Text>
                            <Text style={styles.metricValue}>{vibration}</Text>
                        </View>
                    </View>

                    <View style={styles.metricItem}>
                        <View style={[styles.metricIconBox, { backgroundColor: '#3498DB15' }]}>
                            <Ionicons name="speedometer-outline" size={20} color="#3498DB" />
                        </View>
                        <View style={styles.metricInfo}>
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
                {/* Compact Header */}
                <View style={[styles.topBar, { paddingHorizontal: padding }]}>
                    <Text style={styles.headerTitleCompact}>History</Text>
                    <Text style={styles.headerSubtitleCompact}>
                        {filteredHistory.length} record{filteredHistory.length !== 1 ? 's' : ''} found
                    </Text>
                </View>

                {/* Filters Card - Compact */}
                <View style={[styles.filtersCardCompact, { marginHorizontal: padding }]}>
                    {/* Status filter chips */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.chipScroll}
                    >
                        {["ALL", "NORMAL", "WARNING", "CRITICAL"].map(s => {
                            const colors = {
                                ALL: COLORS.textDark,
                                NORMAL: COLORS.success,
                                WARNING: COLORS.warning,
                                CRITICAL: COLORS.danger
                            };
                            return (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.chip,
                                        statusFilter === s && { backgroundColor: colors[s] }
                                    ]}
                                    onPress={() => setStatusFilter(s)}
                                >
                                    <Text style={[
                                        styles.chipText,
                                        statusFilter === s && { color: "#FFF" }
                                    ]}>
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={[styles.chip, dateFilter && { backgroundColor: COLORS.primary }]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar" size={14} color={dateFilter ? "#FFF" : COLORS.textDark} />
                            {dateFilter && <Text style={styles.chipTextActive}>{dateFilter.getDate()}/{dateFilter.getMonth() + 1}</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.chip, monthFilter && { backgroundColor: COLORS.primary }]}
                            onPress={() => setShowMonthPicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={14} color={monthFilter ? "#FFF" : COLORS.textDark} />
                            {monthFilter && <Text style={styles.chipTextActive}>{monthFilter.getMonth() + 1}/{monthFilter.getFullYear()}</Text>}
                        </TouchableOpacity>

                        {(dateFilter || monthFilter) && (
                            <TouchableOpacity style={styles.chipClear} onPress={clearFilters}>
                                <Ionicons name="close" size={16} color={COLORS.danger} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                {/* Date Picker Modal */}
                <DatePickerModal
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    onSelect={handleDateSelect}
                    title="Select Date"
                />

                {/* Month Picker Modal */}
                <MonthPickerModal
                    visible={showMonthPicker}
                    onClose={() => setShowMonthPicker(false)}
                    onSelect={handleMonthSelect}
                    title="Select Month"
                />

                <FlatList
                    data={filteredHistory}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={[
                        styles.listContent,
                        { paddingHorizontal: padding, paddingBottom: 100 }
                    ]}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconContainer}>
                                <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
                            </View>
                            <Text style={styles.emptyText}>No records found</Text>
                            <Text style={styles.emptySubtext}>
                                Try adjusting your filters or check back later
                            </Text>
                        </View>
                    }
                />
            </View>

            <BottomNav />
        </View>
    );
}

// -----------------------------
// Styles
// -----------------------------
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
        fontWeight: "500",
    },
    topBar: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerTitleCompact: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.textDark,
        marginBottom: 4,
    },
    headerSubtitleCompact: {
        fontSize: 13,
        fontWeight: "500",
        color: COLORS.textLight,
    },
    filtersCardCompact: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chipScroll: {
        flexDirection: "row",
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: COLORS.lightGray,
        marginRight: 6,
        flexDirection: "row",
        alignItems: "center",
    },
    chipText: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.textDark,
    },
    chipTextActive: {
        fontSize: 11,
        fontWeight: "600",
        color: "#FFF",
        marginLeft: 4,
    },
    chipClear: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.danger + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: COLORS.border,
        marginHorizontal: 8,
        alignSelf: 'center',
    },
    listContent: {
        paddingTop: 8,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    dateTimeContainer: {
        flex: 1,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textDark,
        marginLeft: 6,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        fontSize: 13,
        color: COLORS.textLight,
        marginLeft: 6,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 6,
    },
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
    },
    metricItem: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        minWidth: 140,
    },
    metricIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    metricInfo: {
        flex: 1,
    },
    metricLabel: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 2,
    },
    metricValue: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textDark,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: "center",
        paddingHorizontal: 40,
    }
});

// -----------------------------
// Picker Modal Styles
// -----------------------------
const pickerStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
        shadowRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textDark,
        flex: 1,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        gap: 8,
    },
    pickerColumn: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollContainer: {
        maxHeight: 220,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray,
    },
    option: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    selectedOption: {
        backgroundColor: COLORS.primary,
    },
    optionText: {
        fontSize: 14,
        color: COLORS.textDark,
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: '#FFF',
        fontWeight: '700',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    cancelButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    confirmButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
    },
    confirmButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
    },
});
