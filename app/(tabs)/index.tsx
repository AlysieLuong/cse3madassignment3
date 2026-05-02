import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prototype Demo</Text>

      <Text style={styles.subTitle}>
        Follow the steps below to test the implemented features:
      </Text>

      {/*expo speech */}
      <Link href="/speechprototype" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Try Expo Speech Feature</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.disabledButton}>
        <Text style={styles.disabledText}>------------------</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  subTitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  disabledButton: {
    backgroundColor: "#ccc",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  disabledText: {
    color: "#666",
  },
});
