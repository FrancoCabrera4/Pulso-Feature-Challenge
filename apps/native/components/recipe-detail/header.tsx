import { View, Text, StyleSheet } from "react-native";
import { Recipe } from "../../lib/api-client";
import { IconSymbol } from "../ui/icon-symbol";
import { Colors } from "../../constants/constants";


export function Header(
    {recipe}: {recipe: Recipe}
) {
    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            </View>

            <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                    <IconSymbol name="clock" size={20} color={Colors.tabInactive} />
                    <View>
                    <Text style={styles.infoLabel}>Total</Text>
                    <Text style={styles.infoValue}>{recipe.preparationTimeMinutes} minutos</Text>
                    </View>
                </View>
                <View style={styles.infoItem}>
                    <IconSymbol name="fork.knife" size={20} color={Colors.tabInactive} />
                    <View>
                    <Text style={styles.infoLabel}>Porciones</Text>
                    <Text style={styles.infoValue}>{recipe.portions} porciones</Text>
                    </View>
                </View>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24
    },
  titleSection: {
    marginTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    lineHeight: 20,
  },
  infoColumn: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
})