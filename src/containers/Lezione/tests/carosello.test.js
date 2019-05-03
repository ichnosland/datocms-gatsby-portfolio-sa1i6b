import React from 'react';
import { shallow } from 'enzyme';

import TabelleList from 'components/TabelleList';
import Carousel from 'components/Carousel';
import Carosello from '../Carosello';


const mockProps = {
  tabelle: [{
    key: 'tabella_1',
    righe: [
      { valore: '-o', label: '1<sup>a</sup> sing.' },
      { valore: '-s', label: '2<sup>a</sup> sing.' },
      { valore: '-t', label: '3<sup>a</sup> sing.' },
      { valore: '-mus', label: '1<sup>a</sup> plur.' },
      { valore: '-tis', label: '2<sup>a</sup> plur.' },
      { valore: '-nt', label: '3<sup>a</sup> plur.' },
    ],
    titolo: 'Indicativo presente attivo',
  }, {
    key: 'tabella_2',
    righe: [
      { valore: '-r', label: '1<sup>a</sup> sing.' },
      { valore: '-ris, -re', label: '2<sup>a</sup> sing.' },
      { valore: '-tur', label: '3<sup>a</sup> sing.' },
      { valore: '-mur', label: '1<sup>a</sup> plur.' },
      { valore: '-mini', label: '2<sup>a</sup> plur.' },
      { valore: '-ntur', label: '3<sup>a</sup> plur.' },
    ],
    titolo: 'Indicativo presente passivo',
  }, {
    key: 'tabella_3',
    righe: [
      { valore: '-r', label: '1<sup>a</sup> sing.' },
      { valore: '-ris, -re', label: '2<sup>a</sup> sing.' },
      { valore: '-tur', label: '3<sup>a</sup> sing.' },
      { valore: '-mur', label: '1<sup>a</sup> plur.' },
      { valore: '-mini', label: '2<sup>a</sup> plur.' },
      { valore: '-ntur', label: '3<sup>a</sup> plur.' },
    ],
    titolo: 'Indicativo presente farlocco',
  }],
};

describe('<Carosello />', () => {
  it('testo il render quando mostro la prima tabella', () => {
    const renderedComponent = shallow(
      <Carosello {...mockProps} />
    );

    expect(renderedComponent.find(Carousel).length).toBe(1);
    expect(renderedComponent.find(Carousel).props().slides[0]).toEqual(
      <TabelleList
        key={`carosello_risposte_${mockProps.tabelle[0].key}`}
        tabelle={[{
          intestazione: mockProps.tabelle[0].titolo,
          righe: mockProps.tabelle[0].righe.map((r) => (
            [{ titolo: r.label }, { titolo: r.valore }]
          )),
        }]}
      />
    );
  });
});
