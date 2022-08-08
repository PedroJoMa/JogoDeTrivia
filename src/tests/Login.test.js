import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockData from './helpers/mockData';
import App from '../App';

// const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => {
//   return (
//   Promise.resolve({
//     json: () => Promise.resolve(mockData),
//     resolve: true,
//   }));
// });

// afterEach(() => jest.clearAllMocks());

jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

describe('Testando a página Login', () => {
  test('os componentes renderizam na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const gravatarEmailInput = screen.getByTestId('input-gravatar-email');
    const startButton = screen.getByTestId('btn-play');
    const img = screen.getByAltText('logo');

    expect(nameInput).toBeInTheDocument();
    expect(gravatarEmailInput).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');

  })

  test('interagindo com os inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const gravatarEmailInput = screen.getByTestId('input-gravatar-email');
    const startButton = screen.getByRole('button', {name: 'Play'});
    const img = screen.getByRole('img');

    expect(startButton).toBeDisabled()

    userEvent.type(nameInput, 'user');
    userEvent.type(gravatarEmailInput, 'user@email.com');

    expect(nameInput).toHaveValue('user');
    expect(gravatarEmailInput).toHaveValue('user@email.com');

    expect(startButton).toBeEnabled()

    userEvent.click(startButton);
  })

  test('chamada da API', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const gravatarEmailInput = screen.getByTestId('input-gravatar-email');
    const startButton = screen.getByRole('button', {name: 'Play'});
    const img = screen.getByRole('img');

    expect(startButton).toBeDisabled()

    userEvent.type(nameInput, 'user');
    userEvent.type(gravatarEmailInput, 'user@email.com');

    expect(nameInput).toHaveValue('user');
    expect(gravatarEmailInput).toHaveValue('user@email.com');

    expect(startButton).toBeEnabled()

    userEvent.click(startButton);

    expect(fetch).toBeCalled();
  })
})
