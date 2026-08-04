import { TouchableOpacity, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

export default function LoginWithFingerScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={20} color="#2563eb" />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle}>
            <Ionicons name="finger-print" size={54} color="#ffffff" />
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Biometric login</Text>
        </View>

        <Text style={styles.title}>Quick and secure</Text>
        <Text style={styles.subtitle}>
          Place your finger on the sensor to continue safely and instantly.
        </Text>

        <View style={styles.tipBox}>
          <Ionicons name="shield-checkmark" size={18} color="#3b82f6" />
          <Text style={styles.tipText}>Your data stays protected with private, local verification.</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs')}>
          <Ionicons name="scan-outline" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>Use fingerprint</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={() => router.push('/auth/loginWithQRCode')}>
          <Text style={styles.secondaryActionText}>Use QR code instead</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={() => router.push('/auth/login')}>
          <Text style={styles.secondaryActionText}>Use password instead</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9ff',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#93c5fd',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#93c5fd',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  iconWrap: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#60a5fa',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fbff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 12,
    marginBottom: 18,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    color: '#475569',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryAction: {
    marginTop: 16,
  },
  secondaryActionText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
});