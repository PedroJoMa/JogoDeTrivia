import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  getRankingFromLocalStorage = () => {
    const playersInfo = JSON.parse(localStorage.getItem('ranking'));
    const oneNegative = -1;
    return (playersInfo.sort((a, b) => {
      if (a.score > b.score) return oneNegative;
      if (a.score < b.score) return 1;
      return 0;
    }));
  }

  render() {
    return (
      <div data-testid="ranking-title">
        {this.getRankingFromLocalStorage().map((player, index) => (
          <div key={ index }>
            <img
              alt="Perfil"
              src={ player.picture }
            />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Ranking;
