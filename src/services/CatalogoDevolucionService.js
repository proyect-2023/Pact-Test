import axios from 'axios'
export class CatalogoDevolucionService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'https://localhost:7105';
        }
    }
    crearCatalogoDevolucion = (descripcion,nroDias,porcentajeDescuento) => {
        console.log('endpoint: ', this.endpoint + '/api/CatalogoDevolucion');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/CatalogoDevolucion', {
                descripcion,
                nroDias: parseInt(nroDias),
                porcentajeDescuento:parseInt(porcentajeDescuento)
            },{
                headers: {
                    'Accept': 'application/json'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
    
}