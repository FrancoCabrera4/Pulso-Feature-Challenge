import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import { Recipe } from '../../lib/api-client.interface';
import { IconSymbol } from '../ui/icon-symbol';
import { Colors } from '../../constants/constants';


export function RecipeCard(
    { item }: { item: Recipe }
) {
    const router = useRouter()
    
    return (
     <Pressable
      style={styles.recipeCard}
      onPress={() =>
        router.push({
          pathname: '/recipe-detail',
          params: { recipeId: item.id.toString() },
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.timeContainer}>
            <IconSymbol name="clock" size={14} color={Colors.primary} />
            <Text style={styles.timeText}>{item.preparationTimeMinutes} min</Text>
          </View>
          <View style={styles.portionsContainer}>
            <IconSymbol name="fork.knife" size={14} color={Colors.primary} />
            <Text style={styles.portionsText}>{item.portions}</Text>
          </View>
        </View>
      </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  portionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  portionsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
})