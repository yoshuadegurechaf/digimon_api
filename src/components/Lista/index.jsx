import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Filtro from '../Filtro'; // si aún quieres filtrar niveles

function Lista() {
  const navigate = useNavigate();  
  const [data, setData] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [nivelSeleccionado, setNivelSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`https://digimon-api.vercel.app/api/digimon`);
        const digimons = await res.json();

        // Extraemos niveles únicos
        const nivelesExtraidos = new Set();
        digimons.forEach(d => {
          if (d.level) nivelesExtraidos.add(d.level);
        });

        setNiveles([...nivelesExtraidos]);

        setData(digimons);
      } catch (error) {
        console.error("Error al obtener Digimon:", error);
      }
    };

    obtenerDatos();
  }, []);

  const handleNivelChange = (nivel) => {
    setNivelSeleccionado(nivel);
  };

  let resultados = data;

  if (nivelSeleccionado !== 'All') {
    resultados = resultados.filter(digimon =>
      digimon.level === nivelSeleccionado
    );
  }

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = resultados.filter(digimon =>
      digimon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Digimon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleNivelChange} tipos={niveles} />

      <section className='c-lista'>
        {resultados.map((digimon, index) => (
          <div
            className='c-lista-pokemon'
            onClick={() => navigate(`/digimon/${encodeURIComponent(digimon.name)}`)}
            key={index}
          >
            {digimon.img ? (
              <img
                src={digimon.img}
                alt={`Digimon ${digimon.name}`}
                width='auto'
                height='60'
                loading='lazy'
              />
            ) : (
              <div className="c-sin-imagen">
                <p>Imagen no disponible</p>
              </div>
            )}
            <p>{digimon.name}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
