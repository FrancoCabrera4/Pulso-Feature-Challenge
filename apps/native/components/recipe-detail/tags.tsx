import { View, Text, StyleSheet, FlatList } from "react-native";
import { Tag } from "../../lib/api-client.interface";
const TagElement = ({ tag }: { tag: Tag }) => (
    <View style={styles.tagBadge}>
      <Text style={styles.tagText}>{tag.description}</Text>
    </View>
  );

export function Tags({tags}: {tags: Tag[]}) {
    
    console.log(tags)
    return (
        <View style={styles.tagsContainer}> 
            {
                tags.map(tag => {
                    return (
                        <TagElement key={tag.id} tag={tag} />
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%'
    },
    tagBadge: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        textTransform: 'uppercase',
  },   
})

