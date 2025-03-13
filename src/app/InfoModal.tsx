import React from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Contenedor del modal con stopPropagation para evitar que se cierre al hacer clic dentro */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center">Información del Sorteo</h2>
        <p className="mt-2 text-gray-600 text-center">🔹Detalles importantes sobre el sorteo aquí.</p>
        <p className="mt-2 text-gray-600 text-center">🔹Detalles importantes sobre el sorteo aquí.</p>
        <p className="mt-2 text-gray-600 text-center">🔹Detalles importantes sobre el sorteo aquí.</p>
        <p className="mt-2 text-gray-600 text-center">🔹Detalles importantes sobre el sorteo aquí.</p>
        <div className="flex justify-center mt-4">
          <button 
            onClick={onClose} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
