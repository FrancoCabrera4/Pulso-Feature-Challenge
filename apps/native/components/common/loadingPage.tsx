import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/constants";

interface Props {
  loadingMessage: string;
}

export function LoadingPage({ loadingMessage }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        {/*Should change this with pulso icon animation*/}
        <Text style={styles.loadingText}>{loadingMessage}</Text>
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
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
});
