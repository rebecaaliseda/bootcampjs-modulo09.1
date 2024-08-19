import { LineaTicket, TicketFinal } from './modelo';
import {
  calcularResultadoLineaTicket,
  calcularResultadoTotalTicket,
  calcularTotalPorTipoDeIva,
} from '../helpers/calculaTicket.helpers';

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultadoLineasTicket = calcularResultadoLineaTicket(lineasTicket);
  const resultadoTotalTicket = calcularResultadoTotalTicket(resultadoLineasTicket);
  const resultadoTotalIvaTicket = calcularTotalPorTipoDeIva(resultadoLineasTicket);

  return {
    lineas: resultadoLineasTicket,
    total: resultadoTotalTicket,
    desgloseIva: resultadoTotalIvaTicket,
  };
};
