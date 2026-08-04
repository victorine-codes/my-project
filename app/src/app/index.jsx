import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Image
            source={require("../../assets/images/medicine.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Gentle care</Text>
              </View>
              <View style={styles.badgeSecondary}>
                <Text style={styles.badgeSecondaryText}>Classic design</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>A calm, elegant routine for every day.</Text>
            <Text style={styles.heroSubtitle}>
              Keep doses, appointments, and wellness plans beautifully organized in one serene place.
            </Text>
          </View>
        </View>

        <View style={styles.introCard}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Your health routine, made simple</Text>
          <Text style={styles.description}>
            A warm and thoughtful companion that helps you stay on track with comfort and confidence.
          </Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💊</Text>
            <Text style={styles.featureTitle}>Medication</Text>
            <Text style={styles.featureText}>Never miss a dose again</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🗓️</Text>
            <Text style={styles.featureTitle}>Appointments</Text>
            <Text style={styles.featureText}>Stay prepared and on time</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/Register")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f1e8",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    width: "100%",
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7dccf",
    shadowColor: "#4b5563",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  heroImage: {
    width: "100%",
    height: 180,
  },
  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(11, 27, 58, 0.62)",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeSecondary: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(217, 183, 111, 0.24)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#1d4ed8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  badgeSecondaryText: {
    color: "#f8fafc",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "#eff6ff",
    fontSize: 14,
    lineHeight: 20,
  },
  introCard: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fffdf8",
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#efe3cb",
  },
  logo: {
    width: 170,
    height: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f3b68",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  featureRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ece7de",
    shadowColor: "#94a3b8",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3b82f6",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});