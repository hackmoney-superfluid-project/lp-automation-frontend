import './App.css';
import WCActivateButton from './components/WalletConnect Controls/WCActivateButton';
import WCDisconnectButton from './components/WalletConnect Controls/WCDisconnectButton';
import { useWalletConnect } from './utils/WalletConnectSessionProvider';

function App() {

  // get info about the current WalletConnect session
  const walletConnectSession = useWalletConnect();

  return (
    <div className='centered'>
      <WCActivateButton />
      {
        walletConnectSession.isConnected &&
        <WCDisconnectButton />
      }
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
