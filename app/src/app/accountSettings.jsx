import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const [profileExpanded, setProfileExpanded] = useState(true);
  const [securityExpanded, setSecurityExpanded] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Nformi victorine Nheh',
    email: 'aisha@example.com',
    phone: '+237 6 78 12 34 56',
    address: '123 Health Avenue',
  });
  const [security, setSecurity] = useState({
    biometric: true,
    password: '',
  });
  const [profileMessage, setProfileMessage] = useState('');
  const [securityMessage, setSecurityMessage] = useState('');

  const handleProfileSave = () => {
    setProfileMessage('Profile details saved successfully.');
  };

  const handleSecuritySave = () => {
    setSecurityMessage('Security settings updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.title}>Account settings</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.cardHeader} onPress={() => setProfileExpanded(!profileExpanded)} activeOpacity={0.9}>
            <View style={styles.cardTitleWrap}>
              <Text style={styles.cardTitle}>Profile details</Text>
              <Text style={styles.cardText}>Tap any field to update your name, email, phone, and address.</Text>
            </View>
            <Ionicons name={profileExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#64748b" />
          </TouchableOpacity>

          {profileExpanded ? (
            <View style={styles.formSection}>
              <TextInput
                style={styles.input}
                value={profile.name}
                placeholder="Full name"
                onChangeText={(text) => setProfile({ ...profile, name: text })}
              />
              <TextInput
                style={styles.input}
                value={profile.email}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(text) => setProfile({ ...profile, email: text })}
              />
              <TextInput
                style={styles.input}
                value={profile.phone}
                placeholder="Phone"
                keyboardType="phone-pad"
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
              />
              <TextInput
                style={styles.input}
                value={profile.address}
                placeholder="Address"
                onChangeText={(text) => setProfile({ ...profile, address: text })}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleProfileSave}>
                <Text style={styles.primaryButtonText}>Save profile</Text>
              </TouchableOpacity>
              {profileMessage ? <Text style={styles.statusText}>{profileMessage}</Text> : null}
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.cardHeader} onPress={() => setSecurityExpanded(!securityExpanded)} activeOpacity={0.9}>
            <View style={styles.cardTitleWrap}>
              <Text style={styles.cardTitle}>Security</Text>
              <Text style={styles.cardText}>Enable biometric sign-in or change your password securely.</Text>
            </View>
            <Ionicons name={securityExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#64748b" />
          </TouchableOpacity>

          {securityExpanded ? (
            <View style={styles.formSection}>
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.toggleLabel}>Biometric sign-in</Text>
                  <Text style={styles.toggleHint}>Use Face ID or fingerprint for quick access.</Text>
                </View>
                <Switch
                  value={security.biometric}
                  onValueChange={(value) => setSecurity({ ...security, biometric: value })}
                  trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
                  thumbColor={security.biometric ? '#2563eb' : '#f8fafc'}
                />
              </View>
              <TextInput
                style={styles.input}
                value={security.password}
                placeholder="New password"
                secureTextEntry
                onChangeText={(text) => setSecurity({ ...security, password: text })}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleSecuritySave}>
                <Text style={styles.primaryButtonText}>Save security</Text>
              </TouchableOpacity>
              {securityMessage ? <Text style={styles.statusText}>{securityMessage}</Text> : null}
            </View>
          ) : null}
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
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardTitleWrap: { flex: 1, paddingRight: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  cardText: { fontSize: 13, color: '#475569', marginTop: 6, lineHeight: 20 },
  formSection: { marginTop: 14, gap: 10 },
  input: { borderWidth: 1, borderColor: '#dbeafe', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#f8fbff', color: '#0f172a' },
  primaryButton: { alignSelf: 'flex-start', backgroundColor: '#2563eb', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  primaryButtonText: { color: '#ffffff', fontWeight: '700' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  toggleHint: { fontSize: 12, color: '#64748b', marginTop: 2 },
  statusText: { color: '#2563eb', fontSize: 12, marginTop: 4 },
});
