import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function SearchForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const onSearchPress = () => {
    console.warn('Searching for: ', from);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Search the best prices for your next trip
      </Text>

      <TextInput
        value={from}
        onChangeText={setFrom}
        placeholder="From"
        style={styles.input}
      />

      <TextInput
        value={to}
        onChangeText={setTo}
        placeholder="To"
        style={styles.input}
      />

      <Button title="Search" onPress={onSearchPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,

    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  title: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
