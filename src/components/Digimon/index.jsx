import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './styles.css';

function Digimon() {
  const { name } = useParams(); // Nombre recibido de la URL
  const [dataDigimon, setDataDigimon] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDigimon = async () => {
      try {
        const res = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
        const result = await res.json();
        console.log(result); // Muestra lo que devuelve la API
        
        if (result && result.length > 0) {
          setDataDigimon(result[0]);
        } else {
          setError(true); // No se encontró
        }
      } catch (error) {
        console.error("Error al obtener Digimon:", error);
        setError(true); // Hubo error de conexión
      } finally {
        setCargando(false);
      }
    };

    fetchDigimon();
  }, [name]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Digimon no encontrado 😥</p>;

  return (
    <div className="digimon-card">
      {dataDigimon.img && (
        <img 
          src={dataDigimon.img} 
          alt={dataDigimon.name} 
          width="200"
        />
      )}
      <h2>{dataDigimon.name}</h2>

      {dataDigimon.level && (
        <p>Nivel: {dataDigimon.level}</p>
      )}

      {dataDigimon.type && (
        <p>Tipo: {dataDigimon.type}</p>
      )}
    </div>
  );
}

export default Digimon;
