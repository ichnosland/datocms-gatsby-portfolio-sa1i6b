import homeReducer, { defaultState } from '../reducer';
import {
  sendTicketSuccess,
  sendTicketError,
  sendTicket,
} from '../actions';

describe('homeReducer reducer', () => {
  it('should return the initial state when no state is provided', () => {
    const reducer = homeReducer(undefined, { type: undefined });
    expect(reducer.equals(defaultState)).toBeTruthy();
  });

  it('should update the initial state when sendTicket action is provided', () => {
    const mockData = {
      nome: 'nome',
      messaggio: 'messaggio',
    };
    const reducer = homeReducer(undefined, sendTicket(mockData));
    const expected = defaultState.merge({ spinner: true });
    expect(reducer.equals(expected)).toBeTruthy();
  });

  it('should update the initial state when sendTicketSuccess action is provided', () => {
    const reducer = homeReducer(undefined, sendTicketSuccess());
    const expected = defaultState.merge({
      confirmMessage: 'La tua richiesta è stata inviata con successo, riceverai a breve una risposta',
    });
    expect(reducer.equals(expected)).toBeTruthy();
  });

  it('should update the initial state when sendTicketError action is provided', () => {
    const reducer = homeReducer(undefined, sendTicketError());
    const expected = defaultState.merge({
      errorMessage: 'Impossibile inviare il ticket, riprovare più tardi',
    });
    expect(reducer.equals(expected)).toBeTruthy();
  });
});
