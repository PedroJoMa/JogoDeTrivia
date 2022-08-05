import React from 'react';
import PropTypes from 'prop-types';

import logo from '../trivia.png';
import '../App.css';

export default class Login extends React.Component {
  state = {
    username: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { username, email } = this.state;
      if (username && email) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  hendleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleClick = async () => {
    const END_POINT = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(END_POINT);
    const data = (await response.json()).token;
    localStorage.setItem('token', data);
    const { history } = this.props;
    history.push('/gamepage');
  }

  render() {
    const { username, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            data-testid="input-player-name"
            type="text"
            name="username"
            placeholder="Username"
            value={ username }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.hendleClickSettings }
          >
            Settings
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
