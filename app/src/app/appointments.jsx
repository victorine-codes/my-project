import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AppointmentsScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/menu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#7c3aed" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Appointment history</Text>
        <Text style={styles.subtitle}>Keep track of your earlier consultations and follow-ups.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent consultation</Text>
          <Text style={styles.cardText}>Dr. Ada Okafor • 12 July 2026 • Cardiologist</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming follow-up</Text>
          <Text style={styles.cardText}>Dr. Kemi Yusuf • 24 July 2026 • General medicine</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { marginLeft: 8, color: '#7c3aed', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 4 },
});
