import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../constants/constants';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Tags } from '../../components/recipe-detail/tags';
import { Header } from '../../components/recipe-detail/header';
import { Ingredients } from '../../components/recipe-detail/ingredients';
import { Procedures } from '../../components/recipe-detail/procedures';
import { NutritionalData } from '../../components/recipe-detail/nutritionalData';
import { Navbar } from '../../components/recipe-detail/navbar';

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId: string;
    };
  };
}

export default function RecipeDetailScreen({ route }: RecipeDetailScreenProps) {
  // Mock data - in real app this would come from API

  const recipeAlone = {
    id: 1,
    title: 'Pechugas de Pollo Asadas al Horno',
    description:
      'Una receta infalible para pechugas de pollo jugosas y llenas de sabor. Requiere solo 5 ingredientes que probablemente ya tengas en la despensa.',
    imageUrl:
      'https://via.placeholder.com/500x500?text=Pechugas+de+Pollo+Asadas',
    preparationTimeMinutes: 35,
    portions: 4,
  }

  const recipe = {
    id: '1',
    title: 'Pechugas de Pollo Asadas al Horno',
    description:
      'Una receta infalible para pechugas de pollo jugosas y llenas de sabor. Requiere solo 5 ingredientes que probablemente ya tengas en la despensa.',
    image:
      'https://via.placeholder.com/500x500?text=Pechugas+de+Pollo+Asadas',
    totalTime: 35,
    portions: 4,
    style: 'Mediterránea',
    tags: [
      { id: 1, description: 'CON CARNE' },
      { id: 2, description: 'SIN GLUTEN' },
      { id: 3, description: 'SIN LACTOSA' },
      { id: 4, description: 'SIN FRUTOS SECOS' },
      { id: 5, description: 'PLATO PRINCIPAL' },
      { id: 6, description: 'ALTA EN PROTEÍNAS' },
    ],
    ingredients: [
      { id: 1, order: 1, description: '15 ml de aceite de oliva' },
      { id: 2, order: 2, description: '30 ml de aminoácidos de coco' },
      { id: 3, order: 3, description: '15 ml de jugo de limón' },
      { id: 4, order: 4, description: '5 ml de sirope de agave' },
      {
        id: 5,
        order: 5,
        description: '2 pechugas de pollo sin hueso y sin piel (aproximadamente 225 g cada una)',
      },
    ] as Ingredient[],
    procedureSteps: [
      { id: 1, order: 1, description: 'Precalentar el horno a 218°C.' },
      {
        id: 2,
        order: 2,
        description:
          'En un bol amplio, combinar el aceite de oliva, los aminoácidos de coco, el jugo de limón y el sirope de agave. Batir hasta que estén integrados.',
      },
      {
        id: 3,
        order: 3,
        description:
          'Añadir las pechugas de pollo a la marinada, darles vuelta para cubrir bien y dejar reposar por 15 minutos.',
      },
      {
        id: 4,
        order: 4,
        description:
          'Calentar una sartén grande apta para horno a fuego medio-alto. Una vez caliente, añadir las pechugas de pollo y sellar por 2-3 minutos de cada lado.',
      },
      {
        id: 5,
        order: 5,
        description:
          'Transferir la sartén al horno y hornear durante 10-18 minutos, volteando a mitad de cocción, hasta que el pollo alcance una temperatura interna de 74°C.',
      },
      {
        id: 6,
        order: 6,
        description: 'Retirar del horno y dejar reposar 5-10 minutos antes de cortar y servir.',
      },
    ],
    nutritionalInfo: [
      { id: 1, categoryDescription: 'Calorías', value: '178kcal' },
      { id: 2, categoryDescription: 'Proteínas', value: '25g' },
      { id: 3, categoryDescription: 'Carbohidratos', value: '3g' },
      { id: 4, categoryDescription: 'Grasas', value: '6g' },
      { id: 5, categoryDescription: 'Fibra', value: '0g' },
      { id: 6, categoryDescription: 'Grasas saturadas', value: '1g' },
      { id: 7, categoryDescription: 'Colesterol', value: '82mg' },
      { id: 8, categoryDescription: 'Sodio', value: '186mg' },
      { id: 9, categoryDescription: 'Grasas poliinsaturadas', value: '1g' },
      { id: 10, categoryDescription: 'Grasas monoinsaturadas', value: '3g' },
      { id: 11, categoryDescription: 'Grasas trans', value: '0g' },
      { id: 12, categoryDescription: 'Potasio', value: '409mg' },
      { id: 13, categoryDescription: 'Azúcares', value: '3g' },
      { id: 14, categoryDescription: 'Vitamina A', value: '34mcg' },
      { id: 15, categoryDescription: 'Vitamina C', value: '2mg' },
      { id: 16, categoryDescription: 'Calcio', value: '8mg' },
      { id: 17, categoryDescription: 'Hierro', value: '0mg' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <Navbar />

        {/* Recipe Image */}
        <Image
          source={{ uri: recipe.image }}
          style={styles.recipeImage}
          resizeMode="cover"
        />

        {/* Tags */}
        <Tags tags={recipe.tags} />

        <Header recipe={recipeAlone} />

        <Ingredients ingredients={recipe.ingredients}/>

        <Procedures procedureSteps={recipe.procedureSteps}/>

        <NutritionalData nutritionalInfo={recipe.nutritionalInfo}/>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  recipeImage: {
    width: '100%',
    height: 300,
  },
  tagBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
  },
  titleSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  sectionUnderline: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  ingredientsContainer: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    gap: 12,
  },
  ingredientBullet: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginTop: -2,
  },
  ingredientText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  procedureContainer: {
    gap: 16,
  },
  procedureItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  procedureText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
    paddingTop: 6,
  },
  nutritionalContainer: {
    gap: 12,
  },
  nutritionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  nutritionalLabel: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  nutritionalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  actionButtons: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F9FAFC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
