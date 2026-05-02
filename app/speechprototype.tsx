import * as Speech from "expo-speech";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SpeechPrototype() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [voiceCount, setVoiceCount] = useState<number | null>(null);
  const [firstVoice, setFirstVoice] = useState<string>("");

  const instructions =
    "Welcome to the expo-speech prototype. Today we will explain what it does and complete a brief critical analysis on whether it would be useful for STEMM Lab.";

  const getVoices = async () => {
    try {
      Alert.alert("Testing", "Button was pressed");

      const availableVoices = await Speech.getAvailableVoicesAsync();

      setVoiceCount(availableVoices.length);

      if (availableVoices.length > 0) {
        const first = availableVoices[0].name ?? availableVoices[0].identifier;

        setFirstVoice(first);

        Alert.alert(
          "Available Voices",
          `Your device has ${availableVoices.length} voice(s).\nFirst voice: ${first}`,
        );
      } else {
        setFirstVoice("No voices returned");

        Alert.alert(
          "Available Voices",
          "No voices were returned on this device/environment.",
        );
      }
    } catch (error) {
      Alert.alert("Voice Error", "Could not load available voices.");
      console.log("Voice error:", error);
    }
  };

  const speakInstructions = () => {
    const textToSpeak = userInput || instructions;

    if (textToSpeak.length > Speech.maxSpeechInputLength) {
      Alert.alert("Error", "Text is too long to be spoken.");
      return;
    }

    setIsSpeaking(true);

    Speech.speak(textToSpeak, {
      language: "en-AU",
      rate: 0.9,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const stopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expo Speech Prototype</Text>

      <Text style={styles.instructions}>{instructions}</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your own text..."
        placeholderTextColor="#aaa"
        value={userInput}
        onChangeText={setUserInput}
        maxLength={Speech.maxSpeechInputLength}
        multiline
      />

      <Text style={styles.status}>
        Character Count: {userInput.length} / {Speech.maxSpeechInputLength}
      </Text>

      <Text style={styles.status}>
        Currently Speaking: {isSpeaking ? "Yes" : "No"}
      </Text>

      {voiceCount !== null && (
        <Text style={styles.status}>
          Available Voices: {voiceCount}
          {"\n"}
          First Voice: {firstVoice}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={speakInstructions}>
        <Text style={styles.buttonText}>Read Aloud</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={stopSpeech}>
        <Text style={styles.secondaryButtonText}>Stop Speech</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={getVoices}>
        <Text style={styles.secondaryButtonText}>Show Available Voices</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#121212",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },

  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "#fff",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    color: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },

  status: {
    fontSize: 16,
    marginBottom: 16,
    color: "#fff",
  },

  button: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  secondaryButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#666",
    marginBottom: 12,
  },

  secondaryButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
