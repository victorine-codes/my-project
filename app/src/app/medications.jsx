import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const medicationTypes = [
  { name: 'Paracetamol', use: 'For pain and fever relief' },
  { name: 'Amoxicillin', use: 'Antibiotic for bacterial infections' },
  { name: 'Typhoid treatment', use: 'Used under doctor guidance for typhoid care' },
  { name: 'Malaria medicine', use: 'Used for malaria treatment and prevention' },
  { name: 'Vitamin D', use: 'Supports bone and immune health' },
];

export default function MedicationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#2563eb" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Medication types</Text>
        <Text style={styles.subtitle}>Learn about common medicines and when they are used.</Text>

        {medicationTypes.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.use}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { marginLeft: 8, color: '#2563eb', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 4 },
});
