import {
  calculaTicket,
  calcularPorcentajeIva,
  calcularPrecioSinIva,
  calcularResultadoTotalTicket,
  calcularResultadoLineaTicket,
  calcularTotalPorTipoDeIva,
} from './calculaTicket';
import {
  LineaTicket,
  TicketFinal,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from './modelo';

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
          precioSinIva: 3.16,
          tipoIva: 'general',
          precioConIva: 4,
        },
        {
          nombre: 'Perfume',
          cantidad: 3,
          precioSinIva: 47.4,
          tipoIva: 'general',
          precioConIva: 60,
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
          precioSinIva: 4.75,
          tipoIva: 'superreducidoA',
          precioConIva: 5,
        },
      ],
      total: {
        totalSinIva: 61.31,
        totalConIva: 75,
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

describe('calcularResultadoLineaTicket', () => {
  it('Deberá devolver el resultado de las líneas del ticket que dependerá de los productos de entrada que le pasemos', () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [
      {
        producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' },
        cantidad: 2,
      },
    ];
    //Act
    const resultado: ResultadoLineaTicket[] = calcularResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: ResultadoLineaTicket[] = [
      {
        nombre: 'Legumbres',
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: 'general',
        precioConIva: 4,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('Deberá devolver el resultado de las líneas del ticket que dependerá de los productos de entrada que le pasemos', () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [
      {
        producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' },
        cantidad: 1,
      },
    ];
    //Act
    const resultado = calcularResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado = [
      {
        nombre: 'Lasaña',
        cantidad: 1,
        precioSinIva: 4.75,
        tipoIva: 'superreducidoA',
        precioConIva: 5,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
});

describe('calcularPrecioSinIva', () => {
  it.each([
    [20, 'general', 15.8],
    [10, 'reducido', 9],
    [15, 'superreducidoA', 14.25],
    [5, 'superreducidoB', 4.8],
    [2, 'superreducidoC', 2],
    [3, 'sinIva', 3],
  ])(
    'Deberá devolver el precio sin iva correspondiente teniendo en cuenta el precio y tipo de IVA que le pasemos en cada caso',
    (precio: number, tipoDeIva: any, resultadoEsperado: number) => {
      //Act
      const resultado: number = calcularPrecioSinIva(precio, tipoDeIva);
      //Assert
      expect(resultado).toBe(resultadoEsperado);
    }
  );
});

describe('calcularPorcentajeIva', () => {
  it.each([
    ['general', 21],
    ['reducido', 10],
    ['superreducidoA', 5],
    ['superreducidoB', 4],
    ['superreducidoC', 0],
    ['sinIva', 0],
  ])(
    'Deberá devolver el porcentaje de IVA correspondiente al tipo de IVA que le pasemos en cada caso',
    (tipoDeIVa: any, resultadoEsperado: number) => {
      //Act
      const resultado: number = calcularPorcentajeIva(tipoDeIVa);
      //Assert
      expect(resultado).toBe(resultadoEsperado);
    }
  );
});

describe('calcularResultadoTotalTicket', () => {
  it('Deberá devolver los totales de la compra con y sin IVA y el total del IVA al pasarle un ticket concreto', () => {
    //Arrange
    const resultadoLineaTicket: ResultadoLineaTicket[] = [
      {
        nombre: 'Legumbres',
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: 'general',
        precioConIva: 4,
      },
      {
        nombre: 'Perfume',
        cantidad: 3,
        precioSinIva: 47.4,
        tipoIva: 'general',
        precioConIva: 60,
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
        precioSinIva: 4.75,
        tipoIva: 'superreducidoA',
        precioConIva: 5,
      },
    ];
    //Act
    const resultado = calcularResultadoTotalTicket(resultadoLineaTicket);
    //Assert
    const resultadoEsperado: ResultadoTotalTicket = {
      totalConIva: 75,
      totalIva: 13.69,
      totalSinIva: 61.31,
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
});

describe('calcularTotalPorTipoDeIva', () => {
  it('Deberá devolver un desglose con los distintos tipos de IVA y el total al pasarle un ticket concreto', () => {
    //Arrange
    const resultadoLineaTicket: ResultadoLineaTicket[] = [
      {
        nombre: 'Legumbres',
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: 'general',
        precioConIva: 4,
      },
      {
        nombre: 'Perfume',
        cantidad: 3,
        precioSinIva: 47.4,
        tipoIva: 'general',
        precioConIva: 60,
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
        precioSinIva: 4.75,
        tipoIva: 'superreducidoA',
        precioConIva: 5,
      },
    ];
    //Act
    const resultado = calcularTotalPorTipoDeIva(resultadoLineaTicket);
    //Assert
    const resultadoEsperado: TotalPorTipoIva[] = [
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
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
});
