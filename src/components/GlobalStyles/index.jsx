<<<<<<< HEAD
import './index.scss';
import { ConfigProvider } from 'antd';
function GlobalStyles({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(212, 22, 60)',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
=======
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
  return children;
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
}

export default GlobalStyles;
