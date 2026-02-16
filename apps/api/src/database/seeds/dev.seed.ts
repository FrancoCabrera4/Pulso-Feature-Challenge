// src/database/seeds/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { Recipe } from './../../../src/recipes/entities/recipe.entity';
import { Ingredient } from './../../../src/recipes/entities/ingredient.entity';
import { ProcedureStep } from './../../../src/recipes/entities/procedureStep.entity';
import { Tag } from './../../../src/recipes/entities/tag.entity';
import { NutritionalCategory } from './../../../src/recipes/entities/nutritionaCategory.entity';
import { RecipeToNutritionalCategory } from './../../../src/recipes/entities/recipeToNutritionalCategory.entity';


async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  console.log('🌱 Database connected');


  if (process.env.NODE_ENV !== 'production') {
    await seedDev(dataSource);
  }

  await app.close();
  console.log('✅ Seeding completed');
}


async function seedDev(dataSource: DataSource) {

    const recipeRepo = dataSource.getRepository(Recipe);
    const ingredientRepo = dataSource.getRepository(Ingredient);
    const procedureStepRepo = dataSource.getRepository(ProcedureStep);
    const tagRepo = dataSource.getRepository(Tag);
    const nutritionalCategoryRepo = dataSource.getRepository(NutritionalCategory);
    const recipeToNutritionalCategoryRepo = dataSource.getRepository(RecipeToNutritionalCategory);

    // Clear existing data
    await recipeToNutritionalCategoryRepo.deleteAll();
    await ingredientRepo.deleteAll();
    await procedureStepRepo.deleteAll();
    await recipeRepo.deleteAll();
    await tagRepo.deleteAll();
    await nutritionalCategoryRepo.deleteAll();

    // Create tags
    const tagConCarne = await tagRepo.save(tagRepo.create({
        description: 'Con carne'
    }));

    const tagPlatoPrincipal = await tagRepo.save(tagRepo.create({
        description: 'Plato principal'
    }));

    const tagBajaEnSodio = await tagRepo.save(tagRepo.create({
        description: 'Baja en sodio'
    }));

    // Create nutritional categories
    const catCalories = await nutritionalCategoryRepo.save(nutritionalCategoryRepo.create({
        description: 'Calorías'
    }));

    const catProteins = await nutritionalCategoryRepo.save(nutritionalCategoryRepo.create({
        description: 'Proteínas'
    }));

    const catCarbs = await nutritionalCategoryRepo.save(nutritionalCategoryRepo.create({
        description: 'Carbohidratos'
    }));

    const catFats = await nutritionalCategoryRepo.save(nutritionalCategoryRepo.create({
        description: 'Grasas'
    }));

    const catFiber = await nutritionalCategoryRepo.save(nutritionalCategoryRepo.create({
        description: 'Fibra'
    }));

    // Create recipe
    const recipe = await recipeRepo.save(recipeRepo.create({
        title: 'Bowls de vegetales con pollo estilo diosa',
        description: 'Esta receta presenta una ensalada estilo diosa verde que combina kale lacinato, pimientos y tomates, acompañada de pollo marinado en una cremosa mezcla de suero de leche y yogur griego.',
        portions: 4,
        preparationTimeMinutes: 288, // 4.8 hours = 288 minutes
        imageUrl: 'https://via.placeholder.com/500x500?text=Bowls+de+vegetales+con+pollo',
        tags: [tagConCarne, tagPlatoPrincipal, tagBajaEnSodio]
    }));

    // Create ingredients
    const ingredients = [
        // Dressing and marinade
        { order: 1, description: '120 ml de suero de leche bajo en grasa' },
        { order: 2, description: '120 ml de yogur griego natural bajo en grasa' },
        { order: 3, description: '15 g de perejil fresco de hoja plana, ligeramente empacado' },
        { order: 4, description: '1 cucharada de cebollino fresco picado' },
        { order: 5, description: '1 cucharada de jugo de limón más 2 cucharaditas de ralladura de limón, divididas' },
        { order: 6, description: '1 diente de ajo, pelado' },
        // Bowl ingredients
        { order: 7, description: '570 g de tiras de pollo' },
        { order: 8, description: '315 ml de agua' },
        { order: 9, description: '120 g de quinua, enjuagada' },
        { order: 10, description: '1/8 cucharadita de sal' },
        { order: 11, description: '4 tazas de kale dinosaurio, cortado en tiras finas' },
        { order: 12, description: '1/2 pepino mediano, en rodajas' },
        { order: 13, description: '2 pimientos, preferiblemente 1 rojo y 1 naranja o amarillo, picados' },
        { order: 14, description: '1 pinta de tomates cherry, partidos por la mitad si son grandes' },
        { order: 15, description: '1 aguacate, en cubos o rodajas' },
        { order: 16, description: '50 g de queso Cheddar fuerte rallado' },
        { order: 17, description: '25 g de almendras laminadas, tostadas' }
    ];

    for (const ingredientData of ingredients) {
        await ingredientRepo.save(ingredientRepo.create({
            ...ingredientData,
            recipe: recipe
        }));
    }

    // Create procedure steps
    const procedureSteps = [
        {
            order: 1,
            description: 'Combinar el suero de leche, el yogur, el perejil, el cebollino, el jugo de limón y el ajo en un procesador de alimentos y licuar hasta obtener una mezcla homogénea. Refrigerar 1/2 taza para usar como aderezo. Verter el resto de la mezcla en una bolsa grande con cierre y agregar las tiras de pollo. Sacar el aire de la bolsa, sellarla y marinar en el refrigerador por al menos 4 horas (y hasta 6 horas).'
        },
        {
            order: 2,
            description: 'Combinar el agua y la quinua en una cacerola mediana; llevar a ebullición a fuego medio. Reducir el fuego a medio-bajo, cubrir y cocinar a fuego lento hasta que la quinua esté tierna, de 13 a 15 minutos. Escurrir el exceso de líquido. Añadir la ralladura de limón y la sal; esponjar con un tenedor.'
        },
        {
            order: 3,
            description: 'Mientras tanto, colocar la parrilla del horno a unos 10 centímetros de la fuente de calor; precalentar el asador. Forrar una bandeja de horno con papel aluminio. Retirar el pollo de la marinada, sacudir el exceso (descartar la marinada) y colocarlo en la bandeja preparada. Asar el pollo, volteándolo una vez, hasta que un termómetro de lectura instantánea insertado en el centro registre 165°F (74°C), de 8 a 12 minutos.'
        },
        {
            order: 4,
            description: 'Agregar el kale y 1/4 taza del aderezo reservado a la quinua; revolver para combinar. Dividir la mezcla de quinua en 4 tazones. Cubrir con pepino, pimientos, tomates y pollo. Rociar el 1/4 taza de aderezo restante sobre los tazones. Cubrir con aguacate, queso y almendras.'
        }
    ];

    for (const stepData of procedureSteps) {
        await procedureStepRepo.save(procedureStepRepo.create({
            ...stepData,
            recipe: recipe
        }));
    }

    // Create nutritional information
    const nutritionalInfo = [
        { category: catCalories, value: '514' },
        { category: catProteins, value: '51' },
        { category: catCarbs, value: '42' },
        { category: catFats, value: '19' },
        { category: catFiber, value: '10' }
    ];

    for (const info of nutritionalInfo) {
        await recipeToNutritionalCategoryRepo.save(recipeToNutritionalCategoryRepo.create({
            recipe: recipe,
            nutritionalCategory: info.category,
            value: info.value
        }));
    }

    // Create additional tags for second recipe
    const tagSinGluten = await tagRepo.save(tagRepo.create({
        description: 'Sin gluten'
    }));

    const tagSinLactosa = await tagRepo.save(tagRepo.create({
        description: 'Sin lactosa'
    }));

    const tagSinFrutosSecos = await tagRepo.save(tagRepo.create({
        description: 'Sin frutos secos'
    }));

    const tagAltaEnProteinas = await tagRepo.save(tagRepo.create({
        description: 'Alta en proteínas'
    }));

    const tagBajaEnCarbohidratos = await tagRepo.save(tagRepo.create({
        description: 'Baja en carbohidratos'
    }));

    // Create second recipe
    const recipe2 = await recipeRepo.save(recipeRepo.create({
        title: 'Pechugas de Pollo Asadas al Horno',
        description: 'Una receta infalible para pechugas de pollo jugosas y llenas de sabor. Requiere solo 5 ingredientes que probablemente ya tengas en la despensa.',
        portions: 4,
        preparationTimeMinutes: 35,
        imageUrl: 'https://via.placeholder.com/500x500?text=Pechugas+de+Pollo+Asadas',
        tags: [tagConCarne, tagSinGluten, tagSinLactosa, tagSinFrutosSecos, tagPlatoPrincipal, tagAltaEnProteinas, tagBajaEnCarbohidratos]
    }));

    // Create ingredients for second recipe
    const ingredients2 = [
        { order: 1, description: '15 ml de aceite de oliva' },
        { order: 2, description: '30 ml de aminoácidos de coco' },
        { order: 3, description: '15 ml de jugo de limón' },
        { order: 4, description: '5 ml de sirope de agave' },
        { order: 5, description: '2 pechugas de pollo sin hueso y sin piel (aproximadamente 225 g cada una)' }
    ];

    for (const ingredientData of ingredients2) {
        await ingredientRepo.save(ingredientRepo.create({
            ...ingredientData,
            recipe: recipe2
        }));
    }

    // Create procedure steps for second recipe
    const procedureSteps2 = [
        {
            order: 1,
            description: 'Precalentar el horno a 218°C.'
        },
        {
            order: 2,
            description: 'En un bol amplio, combinar el aceite de oliva, los aminoácidos de coco, el jugo de limón y el sirope de agave. Batir hasta que estén integrados.'
        },
        {
            order: 3,
            description: 'Añadir las pechugas de pollo a la marinada, darles vuelta para cubrir bien y dejar reposar por 15 minutos.'
        },
        {
            order: 4,
            description: 'Calentar una sartén grande apta para horno a fuego medio-alto. Una vez caliente, añadir las pechugas de pollo y sellar por 2-3 minutos de cada lado.'
        },
        {
            order: 5,
            description: 'Transferir la sartén al horno y hornear durante 10-18 minutos, volteando a mitad de cocción, hasta que el pollo alcance una temperatura interna de 74°C.'
        },
        {
            order: 6,
            description: 'Retirar del horno y dejar reposar 5-10 minutos antes de cortar y servir.'
        }
    ];

    for (const stepData of procedureSteps2) {
        await procedureStepRepo.save(procedureStepRepo.create({
            ...stepData,
            recipe: recipe2
        }));
    }

    // Create nutritional information for second recipe
    const nutritionalInfo2 = [
        { category: catCalories, value: '178' },
        { category: catProteins, value: '25' },
        { category: catCarbs, value: '3' },
        { category: catFats, value: '6' },
        { category: catFiber, value: '0' }
    ];

    for (const info of nutritionalInfo2) {
        await recipeToNutritionalCategoryRepo.save(recipeToNutritionalCategoryRepo.create({
            recipe: recipe2,
            nutritionalCategory: info.category,
            value: info.value
        }));
    }

    // Create additional tags for third recipe
    const tagAltaEnFibra = await tagRepo.save(tagRepo.create({
        description: 'Alta en fibra'
    }));

    // Create third recipe
    const recipe3 = await recipeRepo.save(recipeRepo.create({
        title: 'Ensalada César de coles de Bruselas',
        description: 'La ensalada César de coles de Bruselas combina el sabor asado de las coles con el toque característico de salsa Worcestershire y queso parmesano.',
        portions: 4,
        preparationTimeMinutes: 25,
        imageUrl: 'https://via.placeholder.com/500x500?text=Ensalada+César+de+coles+de+Bruselas',
        tags: [tagAltaEnFibra, tagAltaEnProteinas]
    }));

    // Create ingredients for third recipe
    const ingredients3 = [
        { order: 1, description: '2 cucharadas de aceite de oliva' },
        { order: 2, description: '450 gr de coles de Bruselas medianas, recortadas y cortadas por la mitad a lo largo' },
        { order: 3, description: '2 cucharaditas de ralladura de limón' },
        { order: 4, description: '2 cucharadas de jugo de limón' },
        { order: 5, description: '1 cucharada de mayonesa' },
        { order: 6, description: '1 diente de ajo pequeño, finamente picado' },
        { order: 7, description: '1 cucharadita de vinagre de vino blanco' },
        { order: 8, description: '1 cucharadita de salsa Worcestershire' },
        { order: 9, description: '1/2 cucharadita de pimienta molida' },
        { order: 10, description: '4 cucharadas de queso parmesano rallado, dividido' },
        { order: 11, description: '2 tazas de corazones de lechuga romana picados' },
        { order: 12, description: '1/2 taza de crutones sazonados al estilo César, picados groseramente' }
    ];

    for (const ingredientData of ingredients3) {
        await ingredientRepo.save(ingredientRepo.create({
            ...ingredientData,
            recipe: recipe3
        }));
    }

    // Create procedure steps for third recipe
    const procedureSteps3 = [
        {
            order: 1,
            description: 'Precalentar el horno a 220°C.'
        },
        {
            order: 2,
            description: 'Calentar aceite de oliva en una sartén grande a fuego medio-alto hasta que brille. Agregar las coles de Bruselas con el lado cortado hacia abajo; cocinar sin mover hasta que estén doradas por debajo, aproximadamente 4 a 5 minutos.'
        },
        {
            order: 3,
            description: 'Dar vuelta las coles de Bruselas. Transferir al horno; asar hasta que estén doradas en los bordes y tiernas-crujientes, de 6 a 8 minutos. Dejar enfriar ligeramente durante aproximadamente 5 minutos.'
        },
        {
            order: 4,
            description: 'Mientras tanto, batir la ralladura de limón, jugo de limón, mayonesa, ajo, vinagre, Worcestershire, pimienta y 3 cucharadas de parmesano en un tazón grande hasta que quede suave. Agregar las coles de Bruselas, la lechuga romana y los crutones; mezclar hasta quedar bien cubiertos.'
        },
        {
            order: 5,
            description: 'Distribuir en 4 platos y espolvorear uniformemente con la cucharada restante de parmesano.'
        }
    ];

    for (const stepData of procedureSteps3) {
        await procedureStepRepo.save(procedureStepRepo.create({
            ...stepData,
            recipe: recipe3
        }));
    }

    // Create nutritional information for third recipe
    const nutritionalInfo3 = [
        { category: catCalories, value: '204' },
        { category: catProteins, value: '8' },
        { category: catCarbs, value: '19' },
        { category: catFats, value: '13' },
        { category: catFiber, value: '7' }
    ];

    for (const info of nutritionalInfo3) {
        await recipeToNutritionalCategoryRepo.save(recipeToNutritionalCategoryRepo.create({
            recipe: recipe3,
            nutritionalCategory: info.category,
            value: info.value
        }));
    }

    // Create additional tags for fourth recipe
    const tagPostre = await tagRepo.save(tagRepo.create({
        description: 'Postre'
    }));

    const tagBajaEnGrasas = await tagRepo.save(tagRepo.create({
        description: 'Baja en grasas'
    }));

    const tagBajaEnCalorias = await tagRepo.save(tagRepo.create({
        description: 'Baja en calorías'
    }));

    // Create fourth recipe
    const recipe4 = await recipeRepo.save(recipeRepo.create({
        title: 'Helado de banana y arándanos',
        description: 'Un helado refrescante y saludable hecho con ingredientes naturales y sin procesar.',
        portions: 4,
        preparationTimeMinutes: 10,
        imageUrl: 'https://via.placeholder.com/500x500?text=Helado+de+banana+y+arándanos',
        tags: [tagSinGluten, tagSinLactosa, tagPostre, tagBajaEnGrasas, tagBajaEnCalorias, tagBajaEnCarbohidratos]
    }));

    // Create ingredients for fourth recipe
    const ingredients4 = [
        { order: 1, description: '6 bananas congeladas' },
        { order: 2, description: '80 g de arándanos congelados' },
        { order: 3, description: '1 papaya de aprox. 500 g' },
        { order: 4, description: 'Hojas de menta para decorar' }
    ];

    for (const ingredientData of ingredients4) {
        await ingredientRepo.save(ingredientRepo.create({
            ...ingredientData,
            recipe: recipe4
        }));
    }

    // Create procedure steps for fourth recipe
    const procedureSteps4 = [
        {
            order: 1,
            description: 'Licuá o mixeá las bananas y los arándanos congelados. Pasá la mezcla a los recipientes para servir el helado.'
        },
        {
            order: 2,
            description: 'Agregá trozos de papaya y decorá con hojas de menta.'
        }
    ];

    for (const stepData of procedureSteps4) {
        await procedureStepRepo.save(procedureStepRepo.create({
            ...stepData,
            recipe: recipe4
        }));
    }

    // Create nutritional information for fourth recipe
    const nutritionalInfo4 = [
        { category: catCalories, value: '245' },
        { category: catProteins, value: '2' },
        { category: catCarbs, value: '62' },
        { category: catFats, value: '1' },
        { category: catFiber, value: '8' }
    ];

    for (const info of nutritionalInfo4) {
        await recipeToNutritionalCategoryRepo.save(recipeToNutritionalCategoryRepo.create({
            recipe: recipe4,
            nutritionalCategory: info.category,
            value: info.value
        }));
    }

    console.log('✅ Recipes seeded successfully!');
}

seed()