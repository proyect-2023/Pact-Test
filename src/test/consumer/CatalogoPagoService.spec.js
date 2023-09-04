import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { CatalogoPagoService } from '../../services/CatalogoPagoService.js';
import { crearCatalogoPagoRequestBody, crearCatalogoPagoResponse} from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let catalogoPagoService;
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
                    path: '/api/CatalogoPago',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearCatalogoPagoRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearCatalogoPagoResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                catalogoPagoService = new CatalogoPagoService(mockServer.url);
                return catalogoPagoService.crearCatalogoPago(crearCatalogoPagoRequestBody.tipo,crearCatalogoPagoRequestBody.descripcion, crearCatalogoPagoRequestBody.porcentaje).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearCatalogoPagoResponse);
                });
            });

        });
    });


    
});