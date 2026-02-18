import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { sendMessage } from "../../lib/api-client";
import { parse, STR, OBJ } from "partial-json";
import { Message } from "../../components/chatbot/message";
import { InitialGreet } from "../../components/chatbot/initialGreet";
import { RecipeRecommendation } from "../../components/chatbot/recipeRecommendation";
import { TextInputComponent } from "../../components/chatbot/textInput";

export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [chatbotText, setChatbotText] = useState("");

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setChatbotText("");
      setMessages((messages) => [
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          isUser: true,
        },
      ]);
      setInputText("");

      await handleStreamResponse({
        inputText,
        chatbotText,
        setChatbotText,
        setMessages,
      });
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
        <InitialGreet userName="Franco Cabrera" />
      ) : null}

      {/* Messages Area */}
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            isUser={message.isUser}
            text={message.text}
            childrenComponents={message.childrenComponents}
          ></Message>
        ))}
        {chatbotText !== "" ? (
          <Message id={messages.length + 1} isUser={false} text={chatbotText} />
        ) : null}
      </ScrollView>

      <TextInputComponent
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
}

interface Props {
  inputText: string;
  chatbotText: string;
  setChatbotText: (text: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
// conceptually speaking this method takes a minute to sink in, so here is a brief explanation of it.
// the backend is going to stream a string of a JSON object (with the generated text and possibly a recipe reommendation), that means
// than even if we piece together all the chunks until the end of the stream we are not going to have a proper JSON file, because of that
// the function uses parse from "partial-json" to parse what it can. Finally when we check if the current data is a proper JSON, and if it is
// that means that the stream has ended and we make the proper updates and close the connection.
const handleStreamResponse = async ({
  inputText,
  chatbotText,
  setChatbotText,
  setMessages,
}: Props) => {
  const eventSource = await sendMessage(inputText);

  let data = "";

  eventSource.onmessage = (event) => {
    data += event.data;
    const json = parse(data, STR | OBJ);
    setChatbotText(json.responseText ? json.responseText : "");
    try {
      const finalJson = JSON.parse(data);
      const finalText = finalJson.responseText ?? chatbotText;
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: finalText,
          isUser: false,
          childrenComponent: finalJson.recipe ? (
            <RecipeRecommendation recipe={finalJson.recipe} />
          ) : null,
        },
      ]);
      setChatbotText("");
      eventSource.close();
    } catch {
      // continue receiving stream if not yet valid JSON
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
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
    paddingTop: 40,
  },
});
