function Filtro({ onTipoChange, tipos }) {
    return (
      <div className="c-filtro">
        <button onClick={() => onTipoChange('All')}>All</button>
        {tipos.map((tipo, index) => (
          <button className='' key={index} onClick={() => onTipoChange(tipo)}>
            {tipo}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;
  