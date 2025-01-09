import Header from '../components/Header.tsx';
import { OwnerSelectMenu } from '../components/OwnerSelectMenu.tsx';
import Footer from '../components/Footer.tsx';

const OwnerTop = () => {
  return (
    <div className="display-container">
      <Header isOwnerMode={true} routePath={''} headerTitle={''} />
      <OwnerSelectMenu />
      <Footer isOwnerMode={true} activeMenu={-1} />
    </div>
  );
};

export default OwnerTop;
