import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FraseForm from './FraseForm';

// Mock de RTK Query
const mockAgregarFrase = jest.fn().mockResolvedValue({});

jest.mock('../api/frasesApi', () => ({
  useAgregarFraseMutation: () => [mockAgregarFrase],
}));

describe('FraseForm', () => {
  it('permite escribir y enviar una frase', async () => {
    render(<FraseForm />);

    const input = screen.getByPlaceholderText('Escribe una frase...');
    const button = screen.getByRole('button', { name: /agregar/i });

    // Escribir una frase
    fireEvent.change(input, { target: { value: 'Hola mundo' } });
    expect((input as HTMLInputElement).value).toBe('Hola mundo');

    // Hacer submit
    fireEvent.click(button);

    // Esperar que la mutación mock haya sido llamada
    await waitFor(() => {
      expect(mockAgregarFrase).toHaveBeenCalledWith({ texto: 'Hola mundo' });
    });

    // Esperar que el input se limpie
    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });
});
