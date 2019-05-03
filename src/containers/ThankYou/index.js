/**
 *
 * ThankYou
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Section from 'components/Section';
import Container from 'components/Container';
import { ButtonLink } from 'components/ButtonLink';
import { H2 } from 'components/Heading';
import LogoPlatform from 'components/LogoPlatform';
import { BrandTxt } from 'components/Text';

export class ThankYou extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { configuration } = this.props;
    return (
      <Section full flextop >
        <Container maxWidth="280px" align="center">
          <H2 margin="0">Grazie</H2>
          <p>La licenza Premium è stata attivata. Puoi controllare la scadenza<br />sul tuo <a href="/profilo"><BrandTxt>profilo</BrandTxt></a>.</p>
          <ButtonLink to="/">Vai alla dashboard</ButtonLink>
        </Container>
        <LogoPlatform
          product={configuration.product}
          height="40px"
          margin="0 0 20px"
        />
      </Section>
    );
  }
}

ThankYou.propTypes = {
  configuration: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
});

const ThankYouConnect = connect(mapStateToProps);

const ThankYouComposed = compose(
  ThankYouConnect,
)(ThankYou);

export default ThankYouComposed;
