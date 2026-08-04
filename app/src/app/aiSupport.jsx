import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const suggestions = [
  'What should I do if I miss a dose?',
  'How can I know if my medicine is working?',
  'When should I contact a doctor urgently?',
];

export default function AISupportScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/menu');
    }
  };
  const [answers, setAnswers] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'I can help you understand your medication routine, symptoms, and next steps. Ask me anything related to your care.',
    },
  ]);

  const handleAsk = () => {
    if (!input.trim()) return;

    const question = input.trim();
    setAnswers((prev) => [
      ...prev,
      { id: Date.now(), type: 'user', text: question },
      {
        id: Date.now() + 1,
        type: 'assistant',
        text: 'Based on your message, it may be best to review your medication plan and reach out to your care team if symptoms continue. If this is urgent, seek medical help promptly.',
      },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>AI Care Assistant</Text>
            <Text style={styles.subtitle}>Get clear support for your medication and wellness questions.</Text>
          </View>
        </View>

        <View style={styles.quickCard}>
          <Text style={styles.sectionTitle}>Popular questions</Text>
          {suggestions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.suggestion} onPress={() => setInput(item)}>
              <Ionicons name="sparkles-outline" size={16} color="#2563eb" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chatCard}>
          {answers.map((item) => (
            <View key={item.id} style={item.type === 'user' ? styles.userBubble : styles.assistantBubble}>
              <Text style={item.type === 'user' ? styles.userText : styles.assistantText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask about your medicine, symptoms, or next steps"
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAsk}>
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  headerCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerInfo: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  quickCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a', marginBottom: 10 },
  suggestion: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: 14, padding: 10, marginBottom: 8 },
  suggestionText: { marginLeft: 8, color: '#2563eb', fontSize: 13, fontWeight: '600' },
  chatCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 14, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#dbeafe', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 8, maxWidth: '80%' },
  assistantBubble: { alignSelf: 'flex-start', backgroundColor: '#f8fafc', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 8, maxWidth: '80%', borderWidth: 1, borderColor: '#e2e8f0' },
  userText: { color: '#1e3a8a', fontSize: 14 },
  assistantText: { color: '#334155', fontSize: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  input: { flex: 1, height: 44, color: '#0f172a', fontSize: 14 },
  sendButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
});
