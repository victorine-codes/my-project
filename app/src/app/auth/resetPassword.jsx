import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };
  const params = useLocalSearchParams();
  const email = typeof params.email === 'string' ? params.email : '';

  const handleReset = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) return;
    if (newPassword !== confirmPassword) return;

    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#2563eb" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons name="lock-closed-outline" size={30} color="#2563eb" />
          </View>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>Create a new password for {email || 'your account'}.</Text>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor="#94a3b8"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#94a3b8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleReset}>
            <Text style={styles.primaryButtonText}>Reset password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9ff' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { marginLeft: 8, color: '#2563eb', fontWeight: '600' },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, shadowColor: '#93c5fd', shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 10 }, elevation: 6 },
  iconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '700', color: '#1e3a8a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6, marginBottom: 18 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fbff', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 2, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 16 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 48, fontSize: 15, color: '#0f172a' },
  primaryButton: { backgroundColor: '#3b82f6', borderRadius: 999, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
});
