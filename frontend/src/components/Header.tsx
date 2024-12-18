import { SlArrowLeft } from 'react-icons/sl';

export default function Header(){
  return (
    <header className="header-container">
      {/*戻るボタン*/}
      <div className="back-button">
        <SlArrowLeft />
      </div>
    </header>
  )
}