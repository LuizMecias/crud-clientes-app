import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import FormularioModal from './formularioModal';
import { deleteClient } from '../services/clientService';

const ClientTable = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    props.loadClients();
  }, []);

  const handleEdit = (cliente) => {
    setEditingClient(cliente);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingClient(null);
  };

  const handleDelete = async (clienteCpf) => {
    Alert.alert(
      'Atenção',
      'Deseja realmente excluir o cliente?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Operação de excluir cancelada'),
        },
        {
          text: 'Excluir',
          onPress: () => handleConfirmDelete(clienteCpf),
        },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmDelete = async (clienteCpf) => {
    await deleteClient(clienteCpf);
    props.loadClients();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Nome</Text>
          <Text style={styles.cell}>CPF</Text>
          <Text style={styles.cell}>Telefone</Text>
          <Text style={styles.cell}>Ações</Text>
        </View>
        {props.clientes?.map((cliente, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{cliente.name}</Text>
            <Text style={styles.cell}>{cliente.cpf}</Text>
            <Text style={styles.cell}>{cliente.telefone}</Text>
            <View style={styles.cell}>
              <Text
                style={{ color: 'blue' }}
                onPress={() => handleEdit(cliente)}
              >
                Editar
              </Text>
              <Text
                style={{ color: 'red' }}
                onPress={() => handleDelete(cliente.cpf)}
              >
                Excluir
              </Text>
            </View>
          </View>
        ))}
      </View>
      {isModalVisible && (
        <FormularioModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          client={editingClient}
          isEditing={true}
          loadClients={props.loadClients}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
});

export default ClientTable;
