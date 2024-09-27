import api from '../services/api';

interface ControlsProps {
  modoAutomatico: boolean;
}

const Controls: React.FC<ControlsProps> = ({ modoAutomatico }) => {
  const handleAbrir = async () => {
    try {
      await api.get('/abrir');
    } catch (error) {
      console.error('Erro ao abrir:', error);
    }
  };

  const handleFechar = async () => {
    try {
      await api.get('/fechar');
    } catch (error) {
      console.error('Erro ao fechar:', error);
    }
  };

  return (
    <div className="controls">
      <button onClick={handleAbrir} disabled={modoAutomatico}>
        Abrir
      </button>
      <button onClick={handleFechar} disabled={modoAutomatico}>
        Fechar
      </button>
    </div>
  );
};

export default Controls;
