import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  error: string;
}

export function ErrorPage({ error }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "500",
    textAlign: "center",
  },
});
