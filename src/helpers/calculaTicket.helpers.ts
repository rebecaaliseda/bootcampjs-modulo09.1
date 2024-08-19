import {
  LineaTicket,
  ResultadoLineaTicket,
  TipoIva,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from '../calcularTicketCompra/modelo';

export const calcularResultadoLineaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultadoLineasTicket: ResultadoLineaTicket[] = [];

  for (let i = 0; i < lineasTicket.length; i++) {
    const { producto, cantidad } = lineasTicket[i];
    const precioSinIva = redondearNumero(producto.precio * cantidad);
    const precioConIva = redondearNumero(
      calcularPrecioConIva(producto.precio, producto.tipoIva) * cantidad
    );

    resultadoLineasTicket = [
      ...resultadoLineasTicket,
      {
        nombre: producto.nombre,
        cantidad: cantidad,
        precioSinIva,
        tipoIva: producto.tipoIva,
        precioConIva,
      },
    ];
  }

  return resultadoLineasTicket;
};

export const redondearNumero = (numero: number) => Number(numero.toFixed(2));

export const calcularPrecioConIva = (precio: number, tipoDeIva: TipoIva): number => {
  const ivaPorcentaje = calcularPorcentajeIva(tipoDeIva);
  const iva = (precio * ivaPorcentaje) / 100;
  const precioConIva = redondearNumero(precio + iva);

  return precioConIva;
};

export const calcularPorcentajeIva = (tipoDeIva: TipoIva): number => {
  let ivaPorcentaje: number = 0;

  switch (tipoDeIva) {
    case 'general':
      ivaPorcentaje = 21;
      break;
    case 'reducido':
      ivaPorcentaje = 10;
      break;
    case 'superreducidoA':
      ivaPorcentaje = 5;
      break;
    case 'superreducidoB':
      ivaPorcentaje = 4;
      break;
    case 'superreducidoC':
      ivaPorcentaje = 0;
      break;
    case 'sinIva':
      ivaPorcentaje = 0;
      break;
  }

  return ivaPorcentaje;
};

export const calcularResultadoTotalTicket = (
  lineasTicket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  const precioTotalSinIva = lineasTicket.reduce((acc, producto) => {
    acc = acc + producto.precioSinIva;
    return acc;
  }, 0);

  const precioTotalConIva = lineasTicket.reduce((acc, producto) => {
    acc = acc + producto.precioConIva;
    return acc;
  }, 0);

  const precioTotalIva = lineasTicket.reduce((acc, producto) => {
    const iva = producto.precioConIva - producto.precioSinIva;
    acc = acc + iva;
    return acc;
  }, 0);

  return {
    totalSinIva: redondearNumero(precioTotalSinIva),
    totalConIva: redondearNumero(precioTotalConIva),
    totalIva: redondearNumero(precioTotalIva),
  };
};

export const calcularTotalPorTipoDeIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  let totalPorTipoIva: TotalPorTipoIva[] = [];

  resultadoLineaTicket.forEach((lineaTicket) => {
    const index = totalPorTipoIva.findIndex(
      (porTipoIva) => porTipoIva.tipoIva === lineaTicket.tipoIva
    );

    if (index !== -1) {
      totalPorTipoIva[index].cuantia = redondearNumero(
        totalPorTipoIva[index].cuantia + lineaTicket.precioConIva - lineaTicket.precioSinIva
      );
    } else {
      totalPorTipoIva = [
        ...totalPorTipoIva,
        {
          tipoIva: lineaTicket.tipoIva,
          cuantia: redondearNumero(lineaTicket.precioConIva - lineaTicket.precioSinIva),
        },
      ];
    }
  });

  return totalPorTipoIva;
};
