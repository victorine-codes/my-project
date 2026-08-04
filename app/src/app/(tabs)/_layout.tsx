import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 74,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="reminder"
        options={{
          title: 'Reminder',
          tabBarIcon: ({ color, size }) => <Ionicons name="alarm-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicine"
        options={{
          title: 'Medicine',
          tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="professional"
        options={{
          title: 'Professional',
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookAppointment/[id]" 
        options={{
          href: null, // Hide the tab bar button for this screen
        }}
      />
    </Tabs>
  );
}
