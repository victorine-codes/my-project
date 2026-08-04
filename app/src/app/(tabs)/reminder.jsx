import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getReminders } from '../../services/api';

export default function ReminderScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState([]);
  const lastTriggeredRef = useRef(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadReminders = async () => {
      try {
        const response = await getReminders();
        if (!cancelled) {
          setReminders(Array.isArray(response?.reminders) ? response.reminders : []);
        }
      } catch (error) {
        if (!cancelled) {
          setReminders([]);
        }
      }
    };

    loadReminders();

    return () => {
      cancelled = true;
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Reminders</Text>
        </View>
        <View style={styles.heroCard}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.eyebrow}>Today’s care plan</Text>
            <Text style={styles.title}>You are on track for a healthy day.</Text>
            <Text style={styles.subtitle}>{reminders.length ? `${reminders.length} reminders are ready today.` : 'No reminders available yet.'}</Text>
          </View>
          <TouchableOpacity style={styles.heroIconWrap} onPress={() => router.push('/menu')}>
            <Ionicons name="menu-outline" size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {reminders.length ? reminders.map((item, index) => (
          <View key={item.reminder_id || index} style={[styles.reminderCard, { backgroundColor: index % 2 === 0 ? '#dbeafe' : '#ecfeff' }]}>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{item.reminder_time}</Text>
            </View>
            <View style={styles.reminderInfo}>
              <Text style={styles.cardTitle}>{item.medication_name || 'Medication reminder'}</Text>
              <Text style={styles.cardText}>{item.repeat_days ? `Repeats on ${item.repeat_days}` : 'Single reminder'}</Text>
            </View>
            <TouchableOpacity style={styles.doneButton}>
              <Ionicons name="checkmark-outline" size={18} color="#2563eb" />
            </TouchableOpacity>
          </View>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No reminders yet</Text>
            <Text style={styles.emptyText}>Add a reminder from the backend or the mobile app to receive alerts.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 10, shadowColor: '#93c5fd', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  heroCard: {
    backgroundColor: '#2563eb',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroTextWrap: { flex: 1, marginRight: 12 },
  eyebrow: { color: '#dbeafe', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  title: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginTop: 6 },
  subtitle: { color: '#eff6ff', fontSize: 14, marginTop: 6, lineHeight: 20 },
  heroIconWrap: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  reminderCard: { borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  timeBadge: { backgroundColor: '#ffffff', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, marginRight: 12 },
  timeText: { color: '#2563eb', fontWeight: '700' },
  reminderInfo: { flex: 1 },
  cardTitle: { color: '#0f172a', fontWeight: '700', fontSize: 15 },
  cardText: { color: '#475569', fontSize: 13, marginTop: 4 },
  doneButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  emptyState: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, alignItems: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  emptyText: { color: '#64748b', marginTop: 6, textAlign: 'center' },
});
