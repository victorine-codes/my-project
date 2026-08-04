import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HealthGoalsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.title}>Health goals</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stay consistent</Text>
          <Text style={styles.cardText}>Take medication on time and keep your water intake high.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Move daily</Text>
          <Text style={styles.cardText}>Walk for 20 minutes each day to improve your energy and mood.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#93c5fd', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 6, lineHeight: 20 },
});
