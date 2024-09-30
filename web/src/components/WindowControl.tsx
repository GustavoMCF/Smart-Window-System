import React, { useState, useEffect } from 'react';
import api from '../services/api';

const WindowControl: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);

  // Função para alternar o modo de controle da janela
  const toggleModo = async () => {
    try {
      const response = await api.get('/toggleModo');
      setModoAutomatico(response.data === 'automatico=1');
    } catch (error) {
      console.error('Erro ao alternar o modo:', error);
    }
  };

// Função para abrir a janela (somente se não estiver aberta)
const handleAbrir = async () => {
  try {
    const response = await api.get('/abrir');
    console.log(response.data.message);
  } catch (error) {
    console.error('Erro ao abrir a janela:', error);
  }
};

// Função para fechar a janela (somente se não estiver fechada)
const handleFechar = async () => {
  try {
    const response = await api.get('/fechar');
    console.log(response.data.message);
  } catch (error) {
    console.error('Erro ao fechar a janela:', error);
  }
};

  return (
    <div className="window-control">
      <h2>Controle de Janela</h2>
      <button onClick={toggleModo} className="modoButton">
        {modoAutomatico ? 'Mudar para Modo Manual' : 'Mudar para Modo Automático'}
      </button>
      <div className="controls">
        <button onClick={handleAbrir} disabled={modoAutomatico}>
          Abrir
        </button>
        <button onClick={handleFechar} disabled={modoAutomatico}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default WindowControl;
