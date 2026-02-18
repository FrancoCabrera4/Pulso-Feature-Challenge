import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/constants'


interface props {
    isUser: boolean,
    text: string
    childrenComponents?: any
}

export function Message(
    {isUser, text, childrenComponents}: props
) {

    return (
          <View
            style={[
              styles.messageWrapper,
              isUser
                ? styles.userMessageWrapper
                : styles.aiMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                isUser
                  ? { backgroundColor: Colors["userChatBackground"] }
                  : { backgroundColor: Colors["background"] },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isUser && { color: "#000", fontWeight: "300" },
                ]}
              >
                {text}
              </Text>
            {childrenComponents}
            </View>

          </View>
    )
}

const styles = StyleSheet.create({
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
})