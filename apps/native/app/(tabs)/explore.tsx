import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/constants';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { getListRecipes } from '../../lib/api-client';
import { Recipe } from '../../lib/api-client.interface';

export default function RecipesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await getListRecipes();
        setRecipes(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load recipes';
        setError(errorMessage);
        console.error('Error loading recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RecipeCard = ({ item }: { item: Recipe }) => (
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
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando recetas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recetas</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={18} color={Colors.tabInactive} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar recetas..."
          placeholderTextColor={Colors.tabInactive}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Recipes List */}
      {filteredRecipes.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noResultsText}>No se encontraron recetas</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={({ item }) => <RecipeCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackgroundColor,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.inputText,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
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
});
