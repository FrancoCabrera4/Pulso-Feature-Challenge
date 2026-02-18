import { View, Text, StyleSheet } from "react-native";
import { Ingredient } from "../../lib/api-client.interface";

const IngredientItem = ({ item }: { item: Ingredient }) => (
  <View style={styles.ingredientItem}>
    <Text style={styles.ingredientBullet}>•</Text>
    <Text style={styles.ingredientText}>{item.description}</Text>
  </View>
);

export function Ingredients({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      <View style={styles.sectionUnderline} />
      <View style={styles.ingredientsContainer}>
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient.id} item={ingredient} />
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
  ingredientsContainer: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    gap: 12,
  },
  ingredientBullet: {
    fontSize: 16,
    color: "#000",
    fontWeight: "800",
    marginTop: -2,
  },
  ingredientText: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
    fontWeight: "500",
  },
});
