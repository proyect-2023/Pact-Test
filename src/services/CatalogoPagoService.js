import axios from 'axios'
export class CatalogoPagoService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'https://localhost:7105';
        }
    }
    crearCatalogoPago = (tipo,descripcion, porcentaje) => {
        console.log('endpoint: ', this.endpoint + '/api/CatalogoPago');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/CatalogoPago', {
                tipo: parseInt(tipo),
                descripcion,
                porcentaje
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