import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/constants";

interface Props {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: (event: any) => void;
}
export function TextInputComponent({
  inputText,
  setInputText,
  handleSendMessage,
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: Colors["inputBackgroundColor"] },
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Consultar a Morfeo..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons
            name="chevron-up-circle"
            size={32}
            color={Colors["sendIcon"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 8,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.inputText,
  },
  sendButton: {
    padding: 8,
  },
});
