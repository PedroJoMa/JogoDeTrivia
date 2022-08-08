import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  setGravatarHash = () => {
    const { getEmail } = this.props;
    const convertEmail = md5(getEmail).toString();
    return (`https://www.gravatar.com/avatar/${convertEmail}`);
  }

  render() {
    const { getUsername } = this.props;
    return (
      <header>
        <img
          alt="Perfil"
          data-testid="header-profile-picture"
          src={ this.setGravatarHash() }
        />
        <p data-testid="header-player-name">{ getUsername }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  getUsername: PropTypes.string.isRequired,
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getUsername: state.player.name,
  getEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
