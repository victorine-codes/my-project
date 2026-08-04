import { Stack} from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ title: "Login", headerShown: false }} />
      <Stack.Screen name="auth/Register" options={{ title: "Register", headerShown: false }} />
      <Stack.Screen name="auth/loginWithFinger" options={{ title: "Fingerprint Login", headerShown: false }} />
      <Stack.Screen name="auth/loginWithQRCode" options={{ title: "QR Login", headerShown: false }} />
      <Stack.Screen name="auth/forgotPassword" options={{ title: "Forgot Password", headerShown: false }} />
      <Stack.Screen name="auth/resetPassword" options={{ title: "Reset Password", headerShown: false }} />
      <Stack.Screen name="auth/logout" options={{ title: "Logout", headerShown: false }} />
      <Stack.Screen name="calendar" options={{ title: "Calendar", headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ title: "Medicine", headerShown: false }} />
      <Stack.Screen name="bookAppointment" options={{ title: "Book Appointment", headerShown: false }} />
      <Stack.Screen name="aiSupport" options={{ title: "AI Support", headerShown: false }} />
      <Stack.Screen name="menu" options={{ title: "Care Menu", headerShown: false }} />
      <Stack.Screen name="medications" options={{ title: "Medication Types", headerShown: false }} />
      <Stack.Screen name="emergency" options={{ title: "Emergency Help", headerShown: false }} />
      <Stack.Screen name="appointments" options={{ title: "Appointments", headerShown: false }} />
      <Stack.Screen name="healthTips" options={{ title: "Health Tips", headerShown: false }} />
    </Stack>
  );
}