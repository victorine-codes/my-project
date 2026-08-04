import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const initialMessages = [
  { id: 1, from: 'specialist', text: 'Hello! I can help with your medication questions and appointment needs.' },
  { id: 2, from: 'patient', text: 'I would like to discuss my medication schedule and book a consultation.' },
];

const slots = ['Tomorrow · 10:30 AM', 'Wednesday · 2:00 PM', 'Friday · 8:15 AM'];

export default function BookAppointmentScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/professional');
    }
  };
  const [input, setInput] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [booked, setBooked] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'patient', text: input.trim() },
    ]);
    setInput('');
  };

  const handleBooking = () => {
    setBooked(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Dr. Amina Noor</Text>
            <Text style={styles.headerSubtitle}>Cardiologist · Online consultation</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        <View style={styles.chatCard}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={message.from === 'patient' ? styles.patientBubble : styles.specialistBubble}
            >
              <Text style={message.from === 'patient' ? styles.patientText : styles.specialistText}>
                {message.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.slotCard}>
          <Text style={styles.sectionTitle}>Available appointment slots</Text>
          {slots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.slotItem, selectedSlot === slot && styles.slotItemActive]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>{booked ? 'Appointment booked' : 'Book appointment'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9ff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#93c5fd',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '700',
  },
  chatCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 14,
    marginBottom: 12,
  },
  patientBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  specialistBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  patientText: {
    color: '#1e3a8a',
    fontSize: 14,
  },
  specialistText: {
    color: '#334155',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 44,
    color: '#0f172a',
    fontSize: 14,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  slotCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  slotItem: {
    backgroundColor: '#f8fbff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  slotItemActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#60a5fa',
  },
  slotText: {
    color: '#475569',
    fontSize: 13,
  },
  slotTextActive: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});
