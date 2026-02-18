import { View, Text, StyleSheet } from "react-native";
import { ProcedureStep } from "../../lib/api-client.interface";

const ProcedureStepItem = ({ item }: { item: ProcedureStep }) => (
  <View style={styles.procedureItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{item.order}.</Text>
    </View>
    <Text style={styles.procedureText}>{item.description}</Text>
  </View>
);

export function Procedures({
  procedureSteps,
}: {
  procedureSteps: ProcedureStep[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Procedimiento</Text>
      <View style={styles.sectionUnderline} />
      <View style={styles.procedureContainer}>
        {procedureSteps.map((step) => (
          <ProcedureStepItem key={step.id} item={step} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  sectionUnderline: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 16,
  },
  procedureContainer: {
    gap: 8,
  },
  procedureItem: {
    flexDirection: "row",
    gap: 8,
  },
  stepNumber: {
    display: "flex",
    alignItems: "center",
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  procedureText: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
});
