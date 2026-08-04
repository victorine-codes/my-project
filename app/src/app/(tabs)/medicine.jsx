import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MedicineScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };
  const medicines = [
    { name: 'Vitamin D', dose: '1 capsule daily', time: '08:00', color: '#fdf2f8', image: require('../../../assets/images/vitaminD.webp') },
    { name: 'Blood Pressure', dose: '1 tablet after lunch', time: '13:00', color: '#f5f3ff', image: require('../../../assets/images/bloodp.webp') },
    { name: 'Calcium', dose: '1 tablet at night', time: '20:30', color: '#eff6ff', image: require('../../../assets/images/calsuim.webp') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.title}>Medicine schedule</Text>
        </View>
        <Text style={styles.subtitle}>Keep your treatment plan organized and simple.</Text>

        {medicines.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
            <Image source={item.image} style={styles.medImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.dose}</Text>
            </View>
            <View style={styles.timeTag}>
              <Text style={styles.timeText}>{item.time}</Text>
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
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 10, shadowColor: '#93c5fd', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 16 },
  card: { borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, shadowColor: '#94a3b8', shadowOpacity: 0.16, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  medImage: { width: 48, height: 48, borderRadius: 14, marginRight: 12, backgroundColor: '#ffffff' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 4 },
  timeTag: { backgroundColor: '#ffffff', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#e2e8f0' },
  timeText: { color: '#2563eb', fontWeight: '700', fontSize: 12 },
});
