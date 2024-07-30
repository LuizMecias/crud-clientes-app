import { useState } from 'react';
import { Modal, View, Text, Pressable, Button, StyleSheet } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../../style/MainStyle.js';
import { createClient, updateClient } from '../services/clientService.js';

export default function FormularioModal({
  isVisible,
  onClose,
  client,
  isEditing,
  loadClients,
}) {
  const [name, setName] = useState(client?.name || '');
  const [cpf, setCpf] = useState(client?.cpf || '');
  const [telefone, setTelefone] = useState(client?.telefone || '');

  const handleSubmit = async () => {
    try {
      const data = {
        name: name,
        cpf: cpf,
        telefone: telefone,
      };

      if (isEditing) {
        await updateClient(client.cpf, data);
      } else {
        await createClient(data);
      }

      loadClients();
      setName('');
      setCpf('');
      setTelefone('');
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={(styles.container, specificStyles.container)}>
        <View style={specificStyles.header}>
          <Text style={specificStyles.headerText}>
            Cadastre um novo cliente
          </Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={specificStyles.form}>
          <MaskInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            mask={Masks.NAME}
            keyboardType="default"
            returnKeyType="done"
            style={specificStyles.input}
          />
          <MaskInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            mask={Masks.BRL_CPF}
            keyboardType="number-pad"
            returnKeyType="done"
            style={specificStyles.input}
            editable={!isEditing}
          />
          <MaskInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            mask={Masks.BRL_PHONE}
            keyboardType="phone-pad"
            returnKeyType="done"
            style={specificStyles.input}
          />
          <View style={specificStyles.buttons}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const specificStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99999999',
  },
  header: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#005599',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#999999',
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    height: 40,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
  },
});
