import Header from '../components/Header.tsx';
import { OwnerSelectMenu } from '../components/OwnerSelectMenu.tsx';
import Footer from '../components/Footer.tsx';

const OwnerTop = () => {
  return (
    <div className="display-container">
      <Header />
      <OwnerSelectMenu />
      <Footer />
    </div>
  );
};

export default OwnerTop;
