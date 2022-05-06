import './App.css';
import AbstractButton from './components/AbstractButton';
import { useWalletConnect } from './utils/WalletConnectSessionProvider';

function App() {

  // get info about the current WalletConnect session
  const walletConnectSession = useWalletConnect();

  return (
    <div className='centered'>
      <AbstractButton
        color='#EEEEEE'
        textColor='black'
        onClick={
          walletConnectSession.isConnected ?
            () => {
              // do something else if already connected
            }
            :
            () => {
              walletConnectSession.connect()
            }
        }
      >
        <p>
          {
            walletConnectSession.isConnected ?
              'Connected'
              :
              'Authenticate with WalletConnect'
          }
        </p>
        <img
          style={{
            'height': '75%',
            'borderRadius': '0.5rem',
            'marginLeft': '1.5rem',
            'marginRight': '-1.5rem'
          }}
          src='./sponsorAssets/walletconnect-square-white.svg'
        />
      </AbstractButton>
      {
        walletConnectSession.connector &&
        walletConnectSession.connector.accounts &&
        <p>
          {walletConnectSession.connector.accounts[0]}
        </p>
      }
    </div>
  );
}

export default App;
