import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const calendarEvents = [
  { day: 'Mon', date: '12', title: 'Medication check-in', time: '08:00' },
  { day: 'Wed', date: '14', title: 'Doctor follow-up', time: '10:30' },
  { day: 'Fri', date: '16', title: 'Prescription refill', time: '14:00' },
];

export default function CalendarScreen() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const dayLabel = today.toLocaleDateString('en', { weekday: 'long' });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Calendar</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>Today</Text>
          <Text style={styles.heroTitle}>{dayLabel}</Text>
          <Text style={styles.heroSubtitle}>Your reminder and appointment schedule at a glance.</Text>
        </View>

        {calendarEvents.map((item) => (
          <View key={item.title} style={styles.eventCard}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  pageTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  heroCard: { backgroundColor: '#2563eb', borderRadius: 24, padding: 20, marginBottom: 16 },
  heroEyebrow: { color: '#dbeafe', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  heroTitle: { color: '#ffffff', fontSize: 22, fontWeight: '700', marginTop: 6 },
  heroSubtitle: { color: '#eff6ff', marginTop: 8 },
  eventCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 18, padding: 14, marginBottom: 12 },
  dayBadge: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  dayText: { color: '#2563eb', fontWeight: '700' },
  dateText: { color: '#0f172a', fontWeight: '800', fontSize: 18 },
  eventInfo: { flex: 1 },
  eventTitle: { color: '#0f172a', fontWeight: '700' },
  eventTime: { color: '#64748b', marginTop: 4 },
});
