import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import SearchForm from './src/components/SearchForm';
import FlightOptionItem from './src/components/FlightOptionItem';
import { LinearGradient } from 'expo-linear-gradient';
import dummyData from './data.json';
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  const onSearch = (data) => {
    console.warn(data);

    // get items form the backend

    setItems(dummyData);
  };

  return (
    <LinearGradient colors={['white', '#E0EFFF']} style={styles.container}>
      <SafeAreaView>
        <SearchForm onSearch={onSearch} />

        <FlatList
          data={items}
          renderItem={({ item }) => <FlightOptionItem flight={item} />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
