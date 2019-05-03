/**
*
* Profilo
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { ListItem, ListItemText, ListPanelHeader } from 'components/NewListPanels';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import { Button, Icon } from 'components/Button';
import { ButtonLink } from 'components/ButtonLink';
import buttonicon from 'icons/buttons';
import { H2 } from 'components/Heading';
import FlexBox from 'components/FlexBox';
import Svg from 'components/Svg';
import SlideToggle from 'components/SlideToggle';
import Scores from 'components/TopBar/Scores';
import icon from 'icons/globals';
import WhatsAppBanner from './WhatsAppBanner';

export const ListItemTextBrand = styled(ListItemText)`
  color: ${(props) => props.theme.brand};
`;

ListItemTextBrand.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

class Profilo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      email,
      nome,
      logoutFunction,
      punti,
      premiumActive,
      sound,
      scadenza,
      gotToPremiumFunction,
      toggleSuoniFx,
      downloadFunction,
      downloadDisponibili,
      whatsapp,
      versioneSoftware,
      svuotaTokenFunction,
    } = this.props;

    return (
      <div>
        <FlexBox
          justifyContent="space-between"
          padding="20px 0"
        >
          <FlexBox>
            <Svg {...icon.profile} />
            <H2 padding="0 10px 0">{nome}</H2>
          </FlexBox>
          <Button
            actioncolor="escape"
            onClick={logoutFunction}
          >
            <Icon {...buttonicon.cancel} fill="#fff" left />
            Logout
          </Button>
        </FlexBox>
        <div>
          <ListItem>
            <ListItemText>email</ListItemText>
            <ListItemTextBrand>{email}</ListItemTextBrand>
          </ListItem>
          {punti > -1 && (
            <ListItem key="studente_punti">
              <ListItemText>Punti totali</ListItemText>
              <ListItemTextBrand><Scores score={` ${punti} XP`} /></ListItemTextBrand>
            </ListItem>
          )}
          {toggleSuoniFx && (
            <ListItem key="suoni">
              <ListItemText>Suoni</ListItemText>
              <ListItemText>
                <SlideToggle
                  check={sound}
                  onClickFunction={toggleSuoniFx}
                  bgcolor="#1cff00"
                />
              </ListItemText>
            </ListItem>)}
          <ListItem key="cambia_password">
            <ListItemText>Cambio password</ListItemText>
            <ListItemText>
              <ButtonLink outline={1} to="/cambia-password">
                <Icon {...buttonicon.edit} left />
                Cambia
              </ButtonLink>
            </ListItemText>
          </ListItem>
          {svuotaTokenFunction && (
            <ListItem key="reset_token">
              <ListItemText>Scollega tutti i device</ListItemText>
              <ListItemText>
                <Button outline={1} onClick={svuotaTokenFunction}>
                  <Icon {...buttonicon.cancel} left />
                  Scollega
                </Button>
              </ListItemText>
            </ListItem>
          )}
          {versioneSoftware && (
            <ListItem key="versione_software">
              <ListItemText>Versione del software</ListItemText>
              <ListItemTextBrand>{versioneSoftware}</ListItemTextBrand>
            </ListItem>
          )}
          {premiumActive && (
            <ListItem key="studente_premiumStatus">
              <ListItemTextBrand><Svg {...buttonicon.star} /> &nbsp;premium</ListItemTextBrand>
              <ListSideBox txt={scadenza} />
            </ListItem>
          )}
          {gotToPremiumFunction && (
            <FlexBox
              justifyContent="space-around"
              padding="20px 0"
              key="studente_premiumButton"
            >
              <Button radius="6px" onClick={gotToPremiumFunction}><Icon {...buttonicon.star} left /> Attiva premium</Button>
            </FlexBox>
          )}
        </div>
        {downloadDisponibili.length > 0 && (
          <div>
            <ListPanelHeader>Allegati</ListPanelHeader>
            {downloadDisponibili.map((allegato) => (
              <ListItem key={`allegato_${allegato.slug}`}>
                <ListItemText>{allegato.titolo}</ListItemText>
                <ListItemText>
                  <Button
                    outline={1}
                    onClick={() => downloadFunction(allegato.slug)}
                  >
                    <Icon {...icon.arrowBoldDown} left />Scarica
                  </Button>
                </ListItemText>
              </ListItem>
            ))}
          </div>
        )}
        {whatsapp && <WhatsAppBanner href={whatsapp} legal />}
      </div>
    );
  }
}

Profilo.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scadenza: PropTypes.string,
  punti: PropTypes.number,
  logoutFunction: PropTypes.func.isRequired,
  premiumActive: PropTypes.bool.isRequired,
  sound: PropTypes.bool,
  whatsapp: PropTypes.string,
  toggleSuoniFx: PropTypes.func,
  gotToPremiumFunction: PropTypes.func,
  downloadDisponibili: PropTypes.array,
  downloadFunction: PropTypes.func,
  versioneSoftware: PropTypes.string,
  svuotaTokenFunction: PropTypes.func,
};

export default Profilo;
