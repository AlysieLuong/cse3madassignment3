import * as Speech from "expo-speech"; //expo-speech package for text-to-speech
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
  //tracks if speech is playing
  const [isSpeaking, setIsSpeaking] = useState(false);

  //stores user text input
  const [userInput, setUserInput] = useState("");

  // stores number of available voices
  const [voiceCount, setVoiceCount] = useState<number | null>(null);

  // stores first voice name/identifier
  const [firstVoice, setFirstVoice] = useState<string>("");

  //defeault instructions if user doesn't input anything
  const instructions =
    "Welcome to the expo-speech prototype. Today we will explain what it does and complete a brief critical analysis on whether it would be useful for STEMM Lab.";

  //retrieves available voices from devices
  const getVoices = async () => {
    try {
      //expo-speech feature, fetch voices available
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

  //handles speaking text (default/user input)
  const speakInstructions = () => {
    const textToSpeak = userInput || instructions;

    //expo-speech feature v, prevents speaking if text exceeds allowed length
    if (textToSpeak.length > Speech.maxSpeechInputLength) {
      Alert.alert("Error", "Text is too long to be spoken.");
      return;
    }

    setIsSpeaking(true);

    //expo-speech feature, converts selected tex string to spoken audio
    Speech.speak(textToSpeak, {
      language: "en-AU", //expo-speech is a speechOption, code of a language to be used to read the text
      rate: 0.9, //expo-speech is speechOption, rate of voice to speak 1.0 is normal rate
      pitch: 1.0, // expo-speech is speechOption, pitch of voice to speak 1.0 is normal pitch
      onDone: () => setIsSpeaking(false), //expo-speech is a speechOpton, callback invoked when speaking is finished
      onStopped: () => setIsSpeaking(false), //expo-speech is a speechOption, callback invoked when speaking is stopped with Speech.stop()
      onError: () => setIsSpeaking(false), // expo-speech is a speechOption, callback invoked when an error occurs while speaking
    });
  };

  //expo-speech features, stops speech
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
        maxLength={Speech.maxSpeechInputLength} //expo-speech, limits input length
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
