import { MdOutlineArrowBackIos } from 'react-icons/md';

export default function Header() {
  return (
    <header className="header-container">
      {/*戻るボタン*/}
      <div className="back-button">
        <MdOutlineArrowBackIos />
      </div>
    </header>
  );
}
