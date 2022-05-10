import { useWalletConnect } from "../../utils/WalletConnectSessionProvider"
import AbstractButton from "../AbstractButton"

export default function WCDisconnectButton() {

    const walletConnectSession = useWalletConnect();

    return (
        <AbstractButton
            color='#de3333'
            textColor='white'
            onClick={
                () => {
                    walletConnectSession.disconnect()
                    //console.log(walletConnectSession.connector)
                }
            }
        >
            <p>
                Disconnect
            </p>
        </AbstractButton>
    )
}