import React, { useState, useEffect } from 'react';
import api from '../services/api';

const WindowControl: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);
  const [estadoJanela, setEstadoJanela] = useState<string>('Fechado');

  // Função para alternar o modo de controle da janela
  const toggleModo = async () => {
    try {
      const response = await api.get('/toggleModo');
      setModoAutomatico(response.data === 'automatico=1');
    } catch (error) {
      console.error('Erro ao alternar o modo:', error);
    }
  };

  // Função para buscar o estado atual da janela
  const fetchEstadoJanela = async () => {
    try {
      const response = await api.get('/estado');
      setEstadoJanela(response.data.split('=')[1]);
    } catch (error) {
      console.error('Erro ao obter o estado da janela:', error);
    }
  };
  
  // Atualizar o estado da janela periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEstadoJanela(); // Atualiza o estado a cada 2 segundos
    }, 2000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Função para abrir a janela
  const handleAbrir = async () => {
    try {
      const response = await api.get('/abrir');
      console.log(response.data.message);
      fetchEstadoJanela(); // Atualiza o estado após abrir
    } catch (error) {
      console.error('Erro ao abrir:', error);
    }
  };

  // Função para fechar a janela
  const handleFechar = async () => {
    try {
      const response = await api.get('/fechar');
      console.log(response.data.message);
      fetchEstadoJanela(); // Atualiza o estado após fechar
    } catch (error) {
      console.error('Erro ao fechar:', error);
    }
  };

return (
  <div className="window-control">
    <h2>Controle de Janela</h2>
    <button onClick={toggleModo} className="modoButton">
      {modoAutomatico ? 'Mudar para Modo Manual' : 'Mudar para Modo Automático'}
    </button>
    <div className="controls">
      <button onClick={handleAbrir} disabled={modoAutomatico || estadoJanela !== 'Fechado'}>
        Abrir
      </button>
      <button onClick={handleFechar} disabled={modoAutomatico || estadoJanela !== 'Aberto'}>
        Fechar
      </button>
    </div>
  </div>
);
};

export default WindowControl;
