import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Nformi victorine Nheh');
  const [subtitle, setSubtitle] = useState('Managing care plan for 2 medications');
  const [message, setMessage] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>
        <View style={styles.headerCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>AD</Text>
          </View>
          <View style={styles.headerInfo}>
            {isEditing ? (
              <View style={styles.editForm}>
                <TextInput
                  style={styles.input}
                  value={name}
                  placeholder="Your name"
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  value={subtitle}
                  placeholder="Your bio"
                  onChangeText={setSubtitle}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    setIsEditing(false);
                    setMessage('Profile updated successfully.');
                  }}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                  <Ionicons name="pencil-outline" size={14} color="#ffffff" />
                  <Text style={styles.editText}>Edit profile</Text>
                </TouchableOpacity>
              </>
            )}
            {message ? <Text style={styles.messageText}>{message}</Text> : null}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your care snapshot</Text>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Reminders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Doctors</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>On track</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/profileNotifications')}>
          <View style={styles.menuIconWrap}>
            <Ionicons name="notifications-outline" size={20} color="#ffffff" />
          </View>
          <Text style={styles.menuText}>Notification preferences</Text>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/healthGoals')}>
          <View style={styles.menuIconWrap}>
            <Ionicons name="heart-outline" size={20} color="#ffffff" />
          </View>
          <Text style={styles.menuText}>Health goals</Text>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/accountSettings')}>
          <View style={styles.menuIconWrap}>
            <Ionicons name="settings-outline" size={20} color="#ffffff" />
          </View>
          <Text style={styles.menuText}>Account settings</Text>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/auth/logout')}>
          <View style={[styles.menuIconWrap, { backgroundColor: '#ef4444' }] }>
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          </View>
          <Text style={styles.menuText}>Logout</Text>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#f4f9ff' },
  content: { padding: 20, paddingBottom: 40 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 10, shadowColor: '#93c5fd', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  headerCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16, shadowColor: '#93c5fd', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#2563eb' },
  headerInfo: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  editButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, marginTop: 10, alignSelf: 'flex-start' },
  editText: { color: '#ffffff', fontSize: 12, fontWeight: '700', marginLeft: 4 },
  editForm: { gap: 8 },
  input: { borderWidth: 1, borderColor: '#dbeafe', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f8fbff', color: '#0f172a' },
  saveButton: { backgroundColor: '#2563eb', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start' },
  saveButtonText: { color: '#ffffff', fontWeight: '700' },
  messageText: { color: '#2563eb', fontSize: 12, marginTop: 6 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#93c5fd', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: 16, paddingVertical: 10, marginHorizontal: 4 },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#2563eb' },
  statLabel: { fontSize: 12, color: '#475569', marginTop: 4 },
  menuItem: { backgroundColor: '#ffffff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, shadowColor: '#93c5fd', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  menuIconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  menuText: { flex: 1, color: '#0f172a', fontWeight: '600' },
});
