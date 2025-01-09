import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBEP4W_wna31xQHWys-WgDHcvkq4BPqcZM",
  authDomain: "myapp-6bf4d.firebaseapp.com",
  projectId: "myapp-6bf4d",
  storageBucket: "myapp-6bf4d.firebasestorage.app",
  messagingSenderId: "735119390219",
  appId: "1:735119390219:web:5a190c019bb904db28b90e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => navigation.navigate("AddItem")} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const AddItemScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (name.trim()) {
        await addDoc(collection(db, "items"), { name });
        setName("");
        navigation.goBack();
      } else {
        alert("Item name cannot be empty");
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Add Item" onPress={handleSubmit} />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
  delete: {
    color: "red",
  },
});
