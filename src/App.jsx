import { useState } from 'react'
import './App.css'
import { CatalogoPagoService } from './services/CatalogoPagoService.js';
import CatalogoDevolucion from './CatalogoDevolucion';


function App() {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [porcentaje, setPorcentaje] = useState('');

  const crearCatalogoClick = () => {
    console.log('Crear Catalogo');
    (new CatalogoPagoService('https://localhost:7105')).crearCatalogoPago(tipo,descripcion, porcentaje).then((id) => {
      alert('Catalogo creado con id: ' + id);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div><input type="text" placeholder="Tipo" value={tipo} onChange={(e) => { setTipo(e.target.value) }} />
        <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
        <input type="text" placeholder="Porcentaje" value={porcentaje} onChange={(e) => { setPorcentaje(e.target.value) }} />
        <button onClick={crearCatalogoClick}>Crear Catalogo Pago</button>
      </div>
      <CatalogoDevolucion />
    </>
  )
}

export default App
