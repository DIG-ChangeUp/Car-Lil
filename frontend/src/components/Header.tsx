import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Container } from '@yamada-ui/react';

export default function Header() {
  return (
    <Container h="100px">
      {/*戻るボタン*/}
      <div className="back-button">
        <MdOutlineArrowBackIos />
      </div>
    </Container>
  );
}
