import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmergencyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#dc2626" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Emergency help</Text>
        <Text style={styles.subtitle}>If symptoms are severe, seek urgent medical attention immediately.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Call emergency services if you have</Text>
          <Text style={styles.cardText}>• severe breathing difficulty {`\n`}
            • chest pain or pressure{`\n`}
            • sudden confusion or trouble speaking
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { marginLeft: 8, color: '#dc2626', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: '#fff1f2', borderRadius: 18, padding: 16 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#991b1b' },
  cardText: { fontSize: 13, color: '#7f1d1d', marginTop: 8, lineHeight: 20 },
});
