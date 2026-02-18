import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { getListRecipes } from "../../lib/api-client";
import { Recipe } from "../../lib/api-client.interface";
import { RecipeCard } from "../../components/explore/recipeCard";
import { SearchBar } from "../../components/explore/searchBar";
import { ErrorPage } from "../../components/common/errorPage";
import { LoadingPage } from "../../components/common/loadingPage";

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
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
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load recipes";
        setError(errorMessage);
        console.error("Error loading recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <LoadingPage loadingMessage="Cargando recetas..." />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recetas</Text>
      </View>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
});
