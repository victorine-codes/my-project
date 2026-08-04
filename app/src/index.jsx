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
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Your care, simplified</Text>
            </View>
            <Text style={styles.heroTitle}>Stay on top of every dose.</Text>
            <Text style={styles.heroSubtitle}>
              A calm, connected way to manage reminders, appointments, and your wellness routine.
            </Text>
          </View>
        </View>

        <View style={styles.logoWrap}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Your health routine, made simple</Text>
        <Text style={styles.description}>
          Keep medications, appointments, and daily care plans close at hand with a warm and supportive experience.
        </Text>

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
          onPress={() => router.push("Register")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("login")}
        >
          <Text style={styles.signIn}>I already have an account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f9ff",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#1f3d7a",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  heroImage: {
    width: "100%",
    height: 150,
  },
  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(7, 24, 54, 0.5)",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  badgeText: {
    color: "#1d4ed8",
    fontSize: 12,
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
  logoWrap: {
    marginTop: 24,
    marginBottom: 8,
  },
  logo: {
    width: 170,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1d4ed8",
    textAlign: "center",
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginTop: 10,
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
    shadowColor: "#94a3b8",
    shadowOpacity: 0.12,
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
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  signIn: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
});