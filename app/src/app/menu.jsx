import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const menuItems = [
  { title: 'AI Care Assistant', icon: 'sparkles-outline', route: '/aiSupport', color: '#2563eb' },
  { title: 'Medication Types', icon: 'medkit-outline', route: '/medications', color: '#0f766e' },
  { title: 'Emergency Help', icon: 'warning-outline', route: '/emergency', color: '#dc2626' },
  { title: 'Calendar & Schedule', icon: 'calendar-outline', route: '/calendar', color: '#7c3aed' },
  { title: 'Appointment History', icon: 'time-outline', route: '/appointments', color: '#0284c7' },
  { title: 'Health Tips', icon: 'heart-outline', route: '/healthTips', color: '#db2777' },
  { title: 'Logout', icon: 'log-out-outline', route: '/auth/logout', color: '#ef4444' },
];

export default function MenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Care Menu</Text>
          <Text style={styles.subtitle}>Find help, guidance, and important health resources.</Text>
        </View>

        {menuItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.menuCard} onPress={() => router.push(item.route)}>
            <View style={[styles.iconWrap, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={20} color="#ffffff" />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6 },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#93c5fd',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  iconWrap: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0f172a' },
});
