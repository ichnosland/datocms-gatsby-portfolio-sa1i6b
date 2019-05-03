Poiché i Button sono uno styled-components le icone sono a loro volta uno s-c a parte, **`<Icon />`**, da inserire manualmente come *children*.
Anche le icone per i pulsanti sono dei path a parte in 'icons/buttons.js'.

Quindi:
  ~~~js
  import { Button, Icon } from 'components/Button';
  import buttonicon from 'icons/buttons';

  <!-- ... -->

  <Button>
    <Icon {...buttonicon.nomeIcona} />
  </Button>
  ~~~