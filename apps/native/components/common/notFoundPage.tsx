import { SafeAreaView, View, Text, StyleSheet } from "react-native";

interface Props {
  notFoundText: string;
}

export function NotFoundPage({ notFoundText }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{notFoundText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "500",
    textAlign: "center",
  },
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
});
