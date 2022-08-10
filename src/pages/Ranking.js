import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div data-testid="ranking-title">
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
