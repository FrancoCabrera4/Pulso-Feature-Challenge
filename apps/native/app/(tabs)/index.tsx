import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/constants";

interface message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function HomeScreen() {
  const [messages, setMessages] = useState<message[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          isUser: true,
        },
      ]);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={{ ...styles.title, textAlign: "center" }}>Morfeo</Text>
      </View>

      {/* Initial Greet */}
      {messages.length === 0 ? (
        <View style={{ ...styles.header, paddingTop: "50px" }}>
          <Text style={styles.title}>
            Hola Franco Cabrera,
          </Text>
          <Text style={styles.subtitle}>Soy Morfeo, tu asistente AI.</Text>
          <Text style={{ ...styles.subtitle, paddingTop: "30px" }}>
            Hazme una pregunta para comenzar
          </Text>
        </View>
      ) : null}

      {/* Messages Area */}
      <ScrollView
        style={{ ...styles.messagesContainer, paddingTop: "40px" }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser
                ? styles.userMessageWrapper
                : styles.aiMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser
                  ? { backgroundColor: Colors["userChatBackground"] }
                  : { backgroundColor: Colors["background"] },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isUser && { color: "#000", fontWeight: "300" },
                ]}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: Colors["inputBackgroundColor"] },
          ]}
        >
          <TextInput
            style={[styles.textInput, { color: Colors["inputText"] }]}
            placeholder="Consultar a Morfeo..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Ionicons
              name="chevron-up-circle"
              size={32}
              color={Colors["sendIcon"]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    opacity: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  messageWrapper: {
    marginBottom: 12,
    flexDirection: "row",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  aiMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
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
  },
  sendButton: {
    padding: 8,
  },
});
