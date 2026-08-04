import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const tips = [
  'Drink plenty of water and avoid skipping meals.',
  'Take your prescribed medication at the same time daily.',
  'Rest well and keep your sleep routine consistent.',
  'Contact your clinician if symptoms persist or worsen.',
];

export default function HealthTipsScreen() {
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
          <Ionicons name="arrow-back" size={20} color="#db2777" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Health tips</Text>
        <Text style={styles.subtitle}>Simple habits that support your wellness every day.</Text>

        {tips.map((tip) => (
          <View key={tip} style={styles.card}>
            <Text style={styles.cardText}>{tip}</Text>
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
  backText: { marginLeft: 8, color: '#db2777', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 14, marginBottom: 12 },
  cardText: { fontSize: 13, color: '#475569', lineHeight: 20 },
});
