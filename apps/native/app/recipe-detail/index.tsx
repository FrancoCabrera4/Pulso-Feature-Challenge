import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/constants';
import { Tags } from '../../components/recipe-detail/tags';
import { Header } from '../../components/recipe-detail/header';
import { Ingredients } from '../../components/recipe-detail/ingredients';
import { Procedures } from '../../components/recipe-detail/procedures';
import { NutritionalData } from '../../components/recipe-detail/nutritionalData';
import { Navbar } from '../../components/recipe-detail/navbar';
import { getRecipeDetail } from '../../lib/api-client';
import { RecipeDetail } from '../../lib/api-client.interface';

export default function RecipeDetailScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        if (!recipeId) {
          throw new Error('Recipe ID is required');
        }
        const recipeData = await getRecipeDetail(recipeId);
        setRecipe(recipeData);
        console.log('Recipe loaded:', recipeData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load recipe';
        setError(errorMessage);
        console.error('Error loading recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando receta...</Text>
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

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>No se encontró la receta</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <Navbar />

        {/* Recipe Image */}
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.recipeImage}
          resizeMode="cover"
        />

        {/* Tags */}
        <Tags tags={recipe.tags} />

        <Header recipe={recipe} />

        <Ingredients ingredients={recipe.ingredients}/>

        <Procedures procedureSteps={recipe.procedure}/>

        <NutritionalData nutritionalInfo={recipe.recipeToNutritionalCategory} />

      </ScrollView>
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
  recipeImage: {
    height: 300,
    width: '100%',
    marginBottom: 24,
  }
});
