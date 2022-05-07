import { useWalletConnect } from "../../utils/WalletConnectSessionProvider";
import AbstractButton from "../AbstractButton"

export default function WCActivateButton() {

    const walletConnectSession = useWalletConnect();

    return (
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
    )
}