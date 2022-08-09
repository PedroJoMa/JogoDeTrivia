import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { getAssertions } = this.props;
    const ASSERTIONS = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <p>{getAssertions}</p>
        <p data-testid="feedback-text">
          {getAssertions >= ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  getAssertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
