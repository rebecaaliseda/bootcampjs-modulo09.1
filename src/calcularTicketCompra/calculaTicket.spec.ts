import { calculaTicket } from './calculaTicket';

import { LineaTicket, TicketFinal } from './modelo';

describe('calculaTicket', () => {
  it('Deberá devolver el ticket total de la compra', () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [
      {
        producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' },
        cantidad: 2,
      },
      {
        producto: { nombre: 'Perfume', precio: 20, tipoIva: 'general' },
        cantidad: 3,
      },
      {
        producto: { nombre: 'Leche', precio: 1, tipoIva: 'superreducidoC' },
        cantidad: 6,
      },
      {
        producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' },
        cantidad: 1,
      },
    ];

    //Act
    const resultado: TicketFinal = calculaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: TicketFinal = {
      lineas: [
        {
          nombre: 'Legumbres',
          cantidad: 2,
          precioSinIva: 4,
          tipoIva: 'general',
          precioConIva: 4.84,
        },
        {
          nombre: 'Perfume',
          cantidad: 3,
          precioSinIva: 60,
          tipoIva: 'general',
          precioConIva: 72.6,
        },
        {
          nombre: 'Leche',
          cantidad: 6,
          precioSinIva: 6,
          tipoIva: 'superreducidoC',
          precioConIva: 6,
        },
        {
          nombre: 'Lasaña',
          cantidad: 1,
          precioSinIva: 5,
          tipoIva: 'superreducidoA',
          precioConIva: 5.25,
        },
      ],
      total: {
        totalSinIva: 75,
        totalConIva: 88.69,
        totalIva: 13.69,
      },

      desgloseIva: [
        {
          tipoIva: 'general',
          cuantia: 13.44,
        },
        {
          tipoIva: 'superreducidoC',
          cuantia: 0,
        },
        {
          tipoIva: 'superreducidoA',
          cuantia: 0.25,
        },
      ],
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
});
