import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/constants';
import { IconSymbol } from '../ui/icon-symbol';

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function SearchBar(
    {searchQuery, setSearchQuery}: Props
) {
    
    return (
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
    )
}

const styles = StyleSheet.create({
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
})