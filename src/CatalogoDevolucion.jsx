import React, { useState } from 'react'
import { CatalogoDevolucionService } from './services/CatalogoDevolucionService';
const CatalogoDevolucion = () => {
    const [nroDias, setNroDias] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
  
    const crearCatalogoDevolucionClick = () => {
        console.log('Crear Catalogo');
        (new CatalogoDevolucionService('https://localhost:7105')).crearCatalogoDevolucion(descripcion,nroDias, porcentaje).then((id) => {
          alert('Catalogo creado con id: ' + id);
        }).catch((error) => {
          console.log(error);
        });
      }
    return (
            <div>
             <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
             <input type="text" placeholder="NroDias" value={nroDias} onChange={(e) => { setNroDias(e.target.value) }} />
             <input type="text" placeholder="Porcentaje" value={porcentaje} onChange={(e) => { setPorcentaje(e.target.value) }} />
             <button onClick={crearCatalogoDevolucionClick}>Crear Catalogo Devolucion</button>
            </div>
    );
}

export default CatalogoDevolucion;