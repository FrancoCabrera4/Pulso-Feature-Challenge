import { View, Text, StyleSheet } from "react-native";

export function InitialGreet({ userName }: { userName: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Hola {userName},</Text>
      <Text style={styles.subtitle}>Soy Morfeo, tu asistente AI.</Text>
      <Text style={styles.subtitle}>Hazme una pregunta para comenzar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    opacity: 1,
    paddingTop: 30,
  },
});
