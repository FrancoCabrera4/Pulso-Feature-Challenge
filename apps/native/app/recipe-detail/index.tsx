import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Tags } from "../../components/recipe-detail/tags";
import { Header } from "../../components/recipe-detail/header";
import { Ingredients } from "../../components/recipe-detail/ingredients";
import { Procedures } from "../../components/recipe-detail/procedures";
import { NutritionalData } from "../../components/recipe-detail/nutritionalData";
import { Navbar } from "../../components/recipe-detail/navbar";
import { getRecipeDetail } from "../../lib/api-client";
import { RecipeDetail } from "../../lib/api-client.interface";
import { LoadingPage } from "../../components/common/loadingPage";
import { ErrorPage } from "../../components/common/errorPage";
import { NotFoundPage } from "../../components/common/notFoundPage";

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
          throw new Error("Recipe ID is required");
        }
        const recipeData = await getRecipeDetail(recipeId);
        setRecipe(recipeData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load recipe";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId]);

  if (loading) {
    return <LoadingPage loadingMessage="Cargando receta..." />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!recipe) {
    return <NotFoundPage notFoundText="No se encontró la receta" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navbar />

        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.recipeImage}
          resizeMode="cover"
        />

        <Tags tags={recipe.tags} />

        <Header recipe={recipe} />

        <Ingredients ingredients={recipe.ingredients} />

        <Procedures procedureSteps={recipe.procedure} />

        <NutritionalData nutritionalInfo={recipe.recipeToNutritionalCategory} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  recipeImage: {
    height: 300,
    width: "100%",
    marginBottom: 24,
  },
});
