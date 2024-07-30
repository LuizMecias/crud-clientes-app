import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import FormularioModal from './src/components/formularioModal';
import styles from './style/MainStyle';
import ClientTable from './src/components/clientTable';
import { getClients } from './src/services/clientService';
import { searchClient } from './src/services/clientService';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [searchText, setSearchText] = useState('');

  const optionsModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOrderClick = () => {
    const sortedClients = [...clientes].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setClientes(sortedClients);
  };

  const loadClients = async () => {
    try {
      const response = await getClients();
      if (response) {
        setClientes(response);
      } else {
        console.error('Failed to load clients');
      }
    } catch (error) {
      console.error('An error occurred while loading clients:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchClient(searchText);
        if (response) {
          setClientes(response);
        } else {
          console.error('Failed to load clients');
        }
      } catch (error) {
        console.error('An error occurred while loading clients:', error);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={specificStyles.header}>
        <Text style={specificStyles.headerText}>Gerenciamento de Clientes</Text>
      </View>
      <View style={specificStyles.headerButtons}>
        <View style={styles.buttons}>
          <Button title="A - Z" onPress={handleOrderClick} />
          <Button title="Cadastrar" onPress={optionsModal} />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Pesquise um cliente..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <View style={specificStyles.table}>
        <ClientTable loadClients={loadClients} clientes={clientes} />
      </View>
      <FormularioModal
        isVisible={isModalVisible}
        onClose={optionsModal}
        client={null}
        isEditing={false}
        loadClients={loadClients}
      ></FormularioModal>
    </View>
  );
}

const specificStyles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 30,
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    maxHeight: 35,
    paddingLeft: 30,
    marginTop: 30,
  },
  table: {
    position: 'absolute',
    top: 120,
    flexDirection: 'row',
  },
});
