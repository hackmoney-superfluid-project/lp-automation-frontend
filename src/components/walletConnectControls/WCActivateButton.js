import { useWalletConnect } from "../../utils/WalletConnectSessionWeb3Provider";
import AbstractNavButton from "../AbstractNavButton"

export default function WCActivateButton() {

    const walletConnectSession = useWalletConnect();

    return (
        <AbstractNavButton
            color='#00000055'
            textColor='#EEEEEE'
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
            <p className='sm:max-w-[10rem] text-ellipsis overflow-hidden' >
                {
                    walletConnectSession.accounts ?
                        walletConnectSession.accounts[0]
                        :
                        'Connect Wallet'
                }
            </p>
            <img
                className='h-1/3 rounded-lg'
                src='./sponsorAssets/walletconnect-logo.svg'
            />
        </AbstractNavButton>
    )
}