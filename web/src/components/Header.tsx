import { useState, useEffect } from 'react';
import api from '../services/api';

const Header: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);

  useEffect(() => {
    const fetchModo = async () => {
      try {
        const response = await api.get('/modo');
        setModoAutomatico(response.data === 'automatico=1');
      } catch (error) {
        console.error('Erro ao obter o modo:', error);
      }
    };
    fetchModo();
  }, []);

  const toggleModo = async () => {
    try {
      await api.get('/toggleModo');
      setModoAutomatico(!modoAutomatico);
    } catch (error) {
      console.error('Erro ao alternar o modo:', error);
    }
  };

  return (
    <header className="header">
      <button onClick={toggleModo} className="modoButton">
        {modoAutomatico ? 'Mudar para Modo Manual' : 'Mudar para Modo Automático'}
      </button>
      <h1>{modoAutomatico ? 'Modo Automático Ativado' : 'Modo Manual Ativado'}</h1>
    </header>
  );
};

export default Header;
