import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfessionalScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };

  const professionals = [
    { name: 'Dr. Gap Elvis', specialty: 'Cardiologist', next: 'Tomorrow · 10:30 AM', color: '#dbeafe', image: require('../../../assets/images/Doctor 2.webp') },
    { name: 'Nurse Nformi Victorine', specialty: 'Care coordinator', next: 'Thursday · 2:00 PM', color: '#fef3c7', image: require('../../../assets/images/nurs.jpg') },
    { name: 'Dr. Bih Vanessa', specialty: 'General physician', next: 'Friday · 8:15 AM', color: '#dcfce7', image: require('../../../assets/images/OIP (3).webp') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.title}>Health professionals</Text>
        </View>
        <Text style={styles.subtitle}>Find trusted support and book your next appointment.</Text>

        {professionals.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
            <Image source={item.image} style={styles.avatarImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.specialty}</Text>
              <Text style={styles.cardMeta}>{item.next}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/bookAppointment/[id]')}>
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
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
  card: { borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatarImage: { width: 48, height: 48, borderRadius: 24, marginRight: 12, backgroundColor: '#ffffff' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 2 },
  cardMeta: { fontSize: 12, color: '#2563eb', marginTop: 4, fontWeight: '600' },
  bookButton: { backgroundColor: '#ffffff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  bookText: { color: '#2563eb', fontWeight: '700', fontSize: 12 },
});
