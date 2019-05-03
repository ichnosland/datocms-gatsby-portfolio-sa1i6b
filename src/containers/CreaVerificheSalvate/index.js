/*
 *
 * CreaVerificheSalvate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Div from 'components/Div';
import EmptyBox from 'components/EmptyBox';
import CreaVerificheList from 'components/CreaVerificheList';
import { creaverificheVerificaSet } from 'containers/CreaVerifiche/actions';

export class CreaVerificheSalvateView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.tornaAllaDashboard = this.tornaAllaDashboard.bind(this);
  }

  tornaAllaDashboard() {
    const { setVerificaData, history } = this.props;

    setVerificaData({
      anteprimaStampa: false,
    });

    history.push('/');
  }

  modificaVerifica = (verifica) => {
    const { setVerificaData, history } = this.props;

    setVerificaData({
      eserciziSelezionati: [...verifica.eserciziSelezionati],
      titolo: verifica.titolo,
      note: verifica.note,
      anteprimaStampa: false,
      key: verifica.key,
    });

    history.push(`/modificaverifica/${verifica.key}`);
  }

  cancellaVerifica = (key) => {
    const { setVerificaData, creaVerifiche } = this.props;
    const nuovoSetData = {
      verificheCreate: [
        ...creaVerifiche.verifica.verificheCreate.filter(
          (singolaVerifica) => (singolaVerifica.key !== key)
        ),
      ],
    };

    if (creaVerifiche.verifica.key === key) {
      nuovoSetData.eserciziSelezionati = [];
      nuovoSetData.titolo = '';
      nuovoSetData.note = '';
      nuovoSetData.key = -1;
    }

    setVerificaData(nuovoSetData);
  }

  render = () => {
    const { creaVerifiche } = this.props;
    const { verificheCreate } = creaVerifiche.verifica;

    return (
      <Page>
        <TopBar
          noShadow
          title="Le tue verifiche"
          single
          closeBtn={{
            onClickFunction: this.tornaAllaDashboard,
            enabled: true,
          }}
        />
        <Container>
          <Div>
            {!verificheCreate.length ?
              <EmptyBox
                text="Non hai ancora creato verifiche"
              />
              :
              <CreaVerificheList
                buttonText={
                  `${verificheCreate.length} ${verificheCreate.length === 1 ? 'Verifica' : 'Verifiche'}`
                }
                itemsList={
                  [...verificheCreate].reverse().map((singolaVerifica) => ({
                    key: `verifica_panel_${singolaVerifica.key}`,
                    elementi: [{
                      id: `step_titolo_${singolaVerifica.key}`,
                      nome: singolaVerifica.titolo,
                      note: true,
                      isHtml: true,
                      text: singolaVerifica.note,
                      esercizi: singolaVerifica.eserciziSelezionati.length,
                      data: singolaVerifica.dataUltimaModifica.toLocaleDateString('it-IT', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        timeZone: 'Europe/Rome',
                        hour: 'numeric',
                        minute: 'numeric',
                      }),
                    }],
                    pulsanti: [{
                      id: `step_button_cancella_${singolaVerifica.key}`,
                      label: 'Cancella',
                      icona: 'trash',
                      onClickFunction: () => this.cancellaVerifica(singolaVerifica.key),
                    }, {
                      id: `step_button_modifica_${singolaVerifica.key}`,
                      label: 'Modifica',
                      icona: 'edit',
                      onClickFunction: () => this.modificaVerifica(singolaVerifica),
                    }],
                  }))
                }
              />}
          </Div>
        </Container>
      </Page>
    );
  }
}

CreaVerificheSalvateView.propTypes = {
  creaVerifiche: PropTypes.object,
  setVerificaData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  creaVerifiche: state.get('CreaVerifiche').toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  setVerificaData: (payload) => {
    dispatch(creaverificheVerificaSet(payload));
  },
});

const CreaVerificheConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CreaVerificheComposed = compose(
  CreaVerificheConnect
)(CreaVerificheSalvateView);

export default CreaVerificheComposed;
