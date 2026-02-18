import { Image, StyleSheet, Text, View } from "react-native";
import { Recipe } from "../../lib/api-client.interface";
import { Colors } from "../../constants/constants";
import { IconSymbol } from "../ui/icon-symbol";

export function RecipeRecommendation({recipe}: {recipe: Recipe}) {
  return (
    <>
    <View style={styles.container}>
      {/* Image on top - full width */}
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.image}
      />

      {/* Content below image */}
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>

        {/* Footer with time and portions */}
        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <IconSymbol name="clock" size={14} color={Colors.primary} />
            <Text style={styles.timeText}>{recipe.preparationTimeMinutes} min</Text>
          </View>
          <View style={styles.portionsContainer}>
            <IconSymbol name="fork.knife" size={14} color={Colors.primary} />
            <Text style={styles.portionsText}>{recipe.portions}</Text>
          </View>
        </View>
      </View>
    </View>
    <Text style={styles.clickReminderText}>Haz click para ver la receta</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.7)",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    width: "70%"
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "#e0e0e0",
  },
  contentWrapper: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#555555",
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(249, 250, 252, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569",
  },
  portionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(249, 250, 252, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  portionsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569",
  },
  clickReminderText: {
    fontSize: 12,
    paddingLeft: 24
  }
});