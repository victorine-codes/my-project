import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { clearAuth } from '../../services/api';

const LogoutScreen = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout of CuraSynce?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logoutUser },
      ]
    );
  };

  const logoutUser = async () => {
    try {
      await clearAuth();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Error', 'Unable to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>Logout</Text>
      <Text style={styles.subtitle}>You are about to sign out of your CuraSynce account.</Text>
      <Text style={styles.note}>Your scheduled medication reminders will continue to work unless you disable them in Settings.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 17,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 10,
  },

  note: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },

  logoutButton: {
    width: '100%',
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  cancelButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#1E88E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancelText: {
    color: '#1E88E5',
    fontSize: 18,
    fontWeight: '700',
  },

});