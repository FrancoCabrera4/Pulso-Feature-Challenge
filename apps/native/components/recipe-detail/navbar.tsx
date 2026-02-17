import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { Colors } from '../../constants/constants';
import { useRouter } from 'expo-router';



export function Navbar() {

    const router = useRouter()

    return (
        <View style={styles.header}>
          <Pressable 
          onPress={() => 
            router.push({
                pathname: '/explore'
            })
          }
          style={styles.backButton}>
            <IconSymbol name="xmark" size={24} color="#4083F6" />
          </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
   header: {
    position: 'absolute',
    display: 'flex',
    right: 10,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#F1F4F9",
    borderRadius: 6,
    zIndex: 100
  },
  backButton: {
    
  }
})

