"use client"; // ✅ Para evitar errores en el uso de useEffect

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import InfoModal from "./InfoModal"; // Asegúrate de que la ruta es correcta
import VerifyModal from "./VerifyModal";
import { checkSupabaseConnection, testConnection } from "../../utils/testSupabase";

const LandingPage = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [boletos, setBoletos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(5);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const ticketPrice = 100;
  const totalPrice = ticketCount * ticketPrice;
  const totalTickets = 99999;
  const soldTickets = 69347;
  const progress = totalTickets > 0 ? (Number(soldTickets) / Number(totalTickets)) * 100 : 0;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);




  useEffect(() => {
    const targetDate = new Date("2025-03-15T00:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    export default function Page() {
      useEffect(() => {
        checkSupabaseConnection();
      }, []);
    
      useEffect(() => {
        testConnection();
      }, []);
    
      return <div>Hola mundo</div>;
    }

// Función para verificar boletos (simulación)
const handleVerifyTickets = (input: string) => {
  console.log("Verificando boletos para:", input);
  // Aquí deberías hacer la petición a la API para obtener los boletos
  // Ejemplo: fetch(`/api/boletos?usuario=${input}`).then(...)
};
    
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  const handlePurchase = () => {
    alert("Redirigiendo a la pasarela de pago...");
  };

  // Función que actualiza la cantidad de boletos y respeta los límites
  const updateTicketCount = (increment: number) => {
    setTicketCount((prev) => Math.max(5, Math.min(500, prev + increment)));
  };

  // Inicia el conteo continuo mientras el botón está presionado
  const startCounting = (increment: number) => {
    if (intervalRef.current) return; // Evita intervalos duplicados
    intervalRef.current = setInterval(() => updateTicketCount(increment), 200);
  };

  // Detiene el conteo cuando se suelta el botón
  const stopCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleInputChange = (inputValue: string) => {
    console.log("Verificando boletos para:", inputValue);
    // Aquí iría la lógica para manejar el input del usuario
  };
  
  const handleVerifyTickets = async () => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/verificar-boletos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      });
  
      const data = await response.json();
      if (data.success) {
        setBoletos(data.boletos);
      } else {
        setErrorMessage("No se encontraron boletos.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };
  

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
    <h1 className="text-4xl font-bold w-full text-left mb-4">🎉 Efaat</h1>
    <div className="text-center">
      <h2 className="text-2xl font-semibold">¡Gana un increíble premio!</h2>
      <p className="text-gray-600 mt-2">Compra tus boletos y participa en este sorteo exclusivo.</p>
    </div>
    <div className="bg-black text-white px-6 py-3 rounded-lg text-center mt-4">
      ⏳ Sorteo en: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>

    <Image src="/PS5.jpg" alt="Premio del sorteo" width={500} /*Ajusta según necesites*/ height={300} 
     className="w-full max-w-xs sm:max-w-md lg:max-w-lg mt-6 rounded-lg shadow-lg" />



  
<div>
      {/* Botón para abrir el modal */}
      <button onClick={() => setShowInfoModal(true)} className="mt-5 p-2 bg-blue-500 text-white rounded">
      ℹ️ Mas Información del sorteo
      </button>

      {/* Modal */}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
    
    <div className="w-full max-w-md bg-gray-200 rounded-full h-6 mt-4 overflow-hidden">
          <div className="bg-green-500 h-full transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }}></div>
    </div>

    <p className="text-gray-700 mt-2">{soldTickets} de {totalTickets} boletos vendidos</p>

    <button onClick={() => setShowVerifyModal(true)} className="mt-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
  🔍 Verificar mis boletos
</button>

<VerifyModal 
      isOpen={showVerifyModal} 
      onClose={() => setShowVerifyModal(false)} 
      onVerify={handleVerifyTickets} 
      handleVerifyTickets={handleVerifyTickets}  // ✅ Agregar esto
      userInput={userInput}
      setUserInput={setUserInput}
      boletos={boletos}
      errorMessage={errorMessage}
    />

<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{[5, 15, 30].map((num) => (
  <div key={num} onClick={() => setTicketCount(num)} className="text-center border p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200">
    <h3 className="text-xl font-semibold">X{num}</h3>
    <Image src={`/x${num}.jpg`} alt={`X${num}`} width={300} height={200} className="w-full h-65 object-cover mt-2" />
    <p className="text-gray-700">${num * ticketPrice}</p>
  </div>
))}
</div>

    <div className="flex items-center mt-4">
    <button
      onMouseDown={() => startCounting(-1)}
      onMouseUp={stopCounting}
      onMouseLeave={stopCounting}
    >
      ➖
    </button>
      <p className="px-6 py-2 bg-white border">{ticketCount} boletos</p>
      <button
      onMouseDown={() => startCounting(1)}
      onMouseUp={stopCounting}
      onMouseLeave={stopCounting}
    >
      ➕
    </button> 
    </div>
    <p className="text-xl font-semibold mt-4">Total: ${totalPrice}</p>
    <button 
      onClick={handlePurchase} 
      className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
      🛒 Comprar Ahora
    </button>

 <footer className="w-full mt-10 text-center text-gray-900 p-4">
<p className="text-sm sm:text-base">
  📧 ventas@inversionesefaat.com | 📞 3014123951
</p>
<div className="flex justify-center mt-2 space-x-4">
      <a href="#" className="text-blue-500 hover:underline">💬 WhatsApp</a>
      <a href="https://www.instagram.com/fxandres30?igsh=MTgzbXo4cHo4cGs3cQ==" className="text-pink-500 hover:underline">📷 Instagram</a>
</div>
</footer>

  </div>
);
};

export default LandingPage
