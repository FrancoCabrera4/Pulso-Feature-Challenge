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
import { sendMessage } from "../../lib/api-client";
import { parse, STR, OBJ } from "partial-json";
import { Message } from "../../components/chatbot/message";
import { InitialGreet } from "../../components/chatbot/initialGreet";
import { RecipeRecommendation } from "../../components/chatbot/recipeRecommendation";

interface message {
  id: number;
  text: string;
  isUser: boolean;
  childrenComponent?: any;
}

export default function HomeScreen() {
  const [messages, setMessages] = useState<message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentMorfeoMessage, setCurrentMorfeoMessage] = useState("")

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setCurrentMorfeoMessage("")
      setMessages((messages) => [
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          isUser: true,
        },
      ]);
      setInputText("");

      const eventSource = await sendMessage(inputText)

      let data = ""

      eventSource.onmessage = (event) => {
        data += event.data
        const json = parse(data, STR | OBJ)
        setCurrentMorfeoMessage(json.responseText ? json.responseText : "")
        try {
          const finalJson = JSON.parse(data)
          console.log(finalJson)
          const finalText = finalJson.responseText ?? currentMorfeoMessage
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: finalText,
              isUser: false,
              childrenComponent: <RecipeRecommendation recipe={finalJson.recipe}/>
            },
          ])
          setCurrentMorfeoMessage("")
          eventSource.close()
        } catch {
          // continue receiving stream if not yet valid JSON
        }
      }
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
          <InitialGreet userName="Franco Cabrera"/>
      ) : null}

      {/* Messages Area */}
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
            <Message key={message.id} isUser={message.isUser} text={message.text} childrenComponents={message.childrenComponent}></Message>
        ))}
        {currentMorfeoMessage !== "" ?
        (<Message isUser={false} text={currentMorfeoMessage} />) :
        null}
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
    backgroundColor: "#fff"
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
    paddingTop: 40
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
