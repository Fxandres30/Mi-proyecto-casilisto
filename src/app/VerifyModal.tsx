interface VerifyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: () => Promise<void>;  // ✅ Esta función ya estaba bien
    handleVerifyTickets: () => Promise<void>;  // ✅ Agregar esta línea
    userInput: string;
    setUserInput: (value: string) => void;
    boletos: string[];
    errorMessage: string;
  }
  
  const VerifyModal: React.FC<VerifyModalProps> = ({ 
    isOpen, 
    onClose, 
    onVerify, 
    handleVerifyTickets,  // ✅ Agregar esto
    userInput, 
    setUserInput, 
    boletos, 
    errorMessage 
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div 
          className="bg-white p-6 rounded-lg shadow-lg w-96" 
          onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
        >
          <h2 className="text-xl font-bold">Verificar Boletos</h2>
          
          <input 
            type="text" 
            placeholder="Ingresa tu correo o teléfono" 
            className="mt-2 p-2 border rounded w-full"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          
          <button 
            onClick={handleVerifyTickets} // ✅ Se usa la función recibida
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full mt-4"
          >
            Verificar
          </button>
          
          <button 
            onClick={onClose} 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
          >
            Cerrar
          </button>
  
          {boletos.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold">Tus boletos:</h3>
              <ul className="mt-2 text-gray-700">
                {boletos.map((boleto, index) => (
                  <li key={index}>🎟️ {boleto}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default VerifyModal;
  