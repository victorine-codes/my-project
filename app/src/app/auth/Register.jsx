import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { registerUser } from '../../services/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dobDate, setDobDate] = useState(new Date(2000, 0, 1)); // Default sensible starting date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [blood, setBlood] = useState('');
  const [address, setAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Helper to format local date without UTC offset shifting
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'set' && selectedDate) {
      setDobDate(selectedDate);
      setDateOfBirth(formatDateLocal(selectedDate));
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !gender || !dateOfBirth || !blood || !address) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser({ fullName: name.trim(), email: email.trim().toLowerCase(), password, phone, gender, dateOfBirth, blood, address });
      Alert.alert('Account created', 'Your account has been created successfully. Please sign in.');
      router.replace('/auth/login');
    } catch (err) {
      const message = err.message || 'Unable to create your account.';
      setError(message);
      Alert.alert('Registration failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#2563eb" />
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Join now</Text>
            </View>
          </View>

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Start building a calmer, better-organized care routine.</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Full name" placeholderTextColor="#94a3b8" value={name} onChangeText={setName} />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#94a3b8" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#94a3b8" value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          {/* Phone / Tel */}
          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Tel / Contact" placeholderTextColor="#94a3b8" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          {/* Gender Picker */}
          <View style={styles.inputGroup}>
            <Ionicons name="transgender-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              dropdownIconColor="#60a5fa"
            >
              <Picker.Item label="Select Gender" value="" color="#94a3b8" />
              <Picker.Item label="Male" value="Male" color="#0f172a" />
              <Picker.Item label="Female" value="Female" color="#0f172a" />
              <Picker.Item label="Other" value="Other" color="#0f172a" />
            </Picker>
          </View>

          {/* Date of Birth Picker Button */}
          <TouchableOpacity style={styles.inputGroup} onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
              {dateOfBirth ? dateOfBirth : 'Date Of Birth (YYYY-MM-DD)'}
            </Text>
          </TouchableOpacity>

          {/* Android Picker Direct Injection */}
          {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
              value={dobDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* iOS Picker Modal */}
          {Platform.OS === 'ios' && (
            <Modal visible={showDatePicker} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text style={styles.modalDoneText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={dobDate}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                </View>
              </View>
            </Modal>
          )}

          {/* Blood Group Picker */}
          <View style={styles.inputGroup}>
            <Ionicons name="water-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <Picker
              selectedValue={blood}
              onValueChange={(itemValue) => setBlood(itemValue)}
              style={styles.picker}
              dropdownIconColor="#60a5fa"
            >
              <Picker.Item label="Select Blood Group" value="" color="#94a3b8" />
              <Picker.Item label="A+" value="A+" color="#0f172a" />
              <Picker.Item label="A-" value="A-" color="#0f172a" />
              <Picker.Item label="B+" value="B+" color="#0f172a" />
              <Picker.Item label="B-" value="B-" color="#0f172a" />
              <Picker.Item label="AB+" value="AB+" color="#0f172a" />
              <Picker.Item label="AB-" value="AB-" color="#0f172a" />
              <Picker.Item label="O+" value="O+" color="#0f172a" />
              <Picker.Item label="O-" value="O-" color="#0f172a" />
            </Picker>
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={18} color="#60a5fa" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#94a3b8" value={address} onChangeText={setAddress} />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.primaryButtonText}>{loading ? 'Creating account...' : 'Create account'}</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#1877f2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.secondaryAction}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.highlightText}>Sign in</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9ff',
  },
  scrollContent: {
    flexGrow: 1,
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
    shadowColor: '#93c5fd',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 140,
    height: 70,
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fbff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#0f172a',
  },
  picker: {
    flex: 1,
    height: 48,
  },
  dateText: {
    flex: 1,
    lineHeight: 48,
    fontSize: 15,
    color: '#0f172a',
  },
  placeholderText: {
    color: '#94a3b8',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
    marginBottom: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#94a3b8',
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#f8fbff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryAction: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
  highlightText: {
    color: '#2563eb',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    alignItems: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalDoneText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 16,
  },
});