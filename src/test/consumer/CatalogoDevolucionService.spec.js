import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { CatalogoDevolucionService } from '../../services/CatalogoDevolucionService.js';
import { crearCatalogoDevolucionRequestBody, crearCatalogoDevolucionResponse} from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let catalogoDevolucionService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'pago-service'
    });

    describe('crear catalogo', () => {
        it('retorna un id de producto ya creado', () => {
            //Arrange
            provider.given('crear catalogo')
                .uponReceiving('un pedido para crear un catalogo')
                .withRequest({
                    method: 'POST',
                    path: '/api/CatalogoDevolucion',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearCatalogoDevolucionRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearCatalogoDevolucionResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                catalogoDevolucionService = new CatalogoDevolucionService(mockServer.url);
                return catalogoDevolucionService.crearCatalogoDevolucion(crearCatalogoDevolucionRequestBody.descripcion,crearCatalogoDevolucionRequestBody.nroDias, crearCatalogoDevolucionRequestBody.porcentajeDescuento).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearCatalogoDevolucionResponse);
                });
            });

        });
    });


    
});