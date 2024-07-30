import axios from 'axios';

const apiUrl = 'http://10.0.0.7:3000/clientes';

export const getClients = async () => {
  try {
    const response = await axios.get(`${apiUrl}/listar`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createClient = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/cadastrar`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateClient = async (cpf, data) => {
  try {
    const response = await axios.put(`${apiUrl}/atualizar/${cpf}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClient = async (cpf) => {
  try {
    const response = await axios.delete(`${apiUrl}/deletar/${cpf}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchClient = async (searchText) => {
  try {
    const response = await axios.get(`${apiUrl}/buscar`, {
      params: {
        searchText,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
