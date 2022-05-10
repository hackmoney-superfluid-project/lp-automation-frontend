import './App.css';
import NavBar from './components/NavBar';
import CreateStreamWidget from './components/superfluidWidgets/CreateStreamWidget';
import UpdateStreamWidget from './components/superfluidWidgets/UpdateStreamWidget';
import DeleteStreamWidget from './components/superfluidWidgets/DeleteStreamWidget';
import { useWalletConnect } from './utils/WalletConnectSessionWeb3Provider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  // get info about the current WalletConnect session
  const walletConnectSession = useWalletConnect();

  return (
    <Router>
      <div className='flex flex-col items-center w-full h-screen p-4 radial-gradient' >
        <NavBar />
        <div className='h-20' />
        <Routes>
          <Route path='/' element={<Navigate to="/create" />} />
          <Route path='/create' element={<CreateStreamWidget />} />
          <Route path='/update' element={<UpdateStreamWidget />} />
          <Route path='/delete' element={<DeleteStreamWidget />} />
          <Route path='*' element={<Navigate to="/create" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
