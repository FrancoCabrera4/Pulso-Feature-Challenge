import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/constants';
import { IconSymbol } from '../../components/ui/icon-symbol';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  totalTime: number;
  portions: number;
  style: string;
  tags: { id: string; label: string }[];
}

export default function RecipesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real app this would come from API
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Bowls de vegetales con pollo estilo diosa',
      description:
        'Esta receta presenta una ensalada estilo diosa verde que combina kale lacinato, pimientos y tomates, acompañada de pollo marinado.',
      image: 'https://via.placeholder.com/500x500?text=Bowls+de+vegetales+con+pollo',
      totalTime: 288,
      portions: 4,
      style: 'Mediterránea',
      tags: [
        { id: '1', label: 'Con carne' },
        { id: '2', label: 'Plato principal' },
      ],
    },
    {
      id: '2',
      title: 'Pechugas de Pollo Asadas al Horno',
      description:
        'Una receta infalible para pechugas de pollo jugosas y llenas de sabor. Requiere solo 5 ingredientes.',
      image: 'https://via.placeholder.com/500x500?text=Pechugas+de+Pollo',
      totalTime: 35,
      portions: 4,
      style: 'Mediterránea',
      tags: [
        { id: '1', label: 'Con carne' },
        { id: '2', label: 'Sin gluten' },
      ],
    },
    {
      id: '3',
      title: 'Ensalada César de coles de Bruselas',
      description:
        'La ensalada César de coles de Bruselas combina el sabor asado de las coles con el toque característico de salsa Worcestershire.',
      image: 'https://via.placeholder.com/500x500?text=Ensalada+César',
      totalTime: 25,
      portions: 4,
      style: 'Mediterránea',
      tags: [
        { id: '1', label: 'Alta en fibra' },
        { id: '2', label: 'Alta en proteínas' },
      ],
    },
    {
      id: '4',
      title: 'Helado de banana y arándanos',
      description:
        'Un helado refrescante y saludable hecho con ingredientes naturales y sin procesar.',
      image: 'https://via.placeholder.com/500x500?text=Helado+de+banana',
      totalTime: 10,
      portions: 4,
      style: 'Mediterránea',
      tags: [
        { id: '1', label: 'Sin gluten' },
        { id: '2', label: 'Postre' },
      ],
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RecipeCard = ({ item }: { item: Recipe }) => (
    <Pressable
      style={styles.recipeCard}
      onPress={() =>
        router.push({
          pathname: '/recipe-detail',
          params: { recipeId: item.id },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.timeContainer}>
            <IconSymbol name="clock" size={14} color={Colors.primary} />
            <Text style={styles.timeText}>{item.totalTime} min</Text>
          </View>
          <View style={styles.portionsContainer}>
            <IconSymbol name="fork.knife" size={14} color={Colors.primary} />
            <Text style={styles.portionsText}>{item.portions}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

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
      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <RecipeCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
