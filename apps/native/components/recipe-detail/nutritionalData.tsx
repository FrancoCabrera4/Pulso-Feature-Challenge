import { View, Text, StyleSheet } from 'react-native';
import { NutritionalInfo } from '../../lib/api-client';



const NutritionalRow = ({ item }: { item: NutritionalInfo }) => (
    <View style={styles.nutritionalRow}>
      <Text style={styles.nutritionalLabel}>{item.categoryDescription}</Text>
      <Text style={styles.nutritionalValue}>
        {item.value}
      </Text>
    </View>
  );

export function NutritionalData(
    {nutritionalInfo}: {nutritionalInfo: NutritionalInfo[]}
) {
    return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información nutricional por porción</Text>
          <View style={styles.sectionUnderline} />
          <View style={styles.nutritionalContainer}>
            {nutritionalInfo.map((info, index) => (
              <NutritionalRow key={index} item={info} />
            ))}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    marginBottom: 8,
  },
  sectionUnderline: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  nutritionalContainer: {
    gap: 12,
  },
  nutritionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nutritionalLabel: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  nutritionalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
})

