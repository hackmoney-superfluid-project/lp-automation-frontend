import { useEffect, useState } from "react";
import { useWalletConnect } from "../../utils/WalletConnectSessionWeb3Provider";
import deleteFlow from "../../utils/superfluidFunctions/deleteStream";
import AbstractWidgetContainer from "../AbstractWidgetContainer";
import AddressEntryField from "./AddressEntryField";
import NumberEntryField from "./NumberEntryField";

export default function DeleteStreamWidget() {

    // form state
    const [address, setAddress] = useState('');

    // get current wallet session
    const walletConnectSession = useWalletConnect();

    return (
        <AbstractWidgetContainer
            title='Delete Stream'
            color='#00000066'
            textColor='#EEEEEE'
        >
            <AddressEntryField title='Address' address={address} setAddress={setAddress} />
            <button 
                className='h-14 bg-red-500/75 font-bold rounded-2xl hover:outline outline-2 outline-gray-100/10'
                onClick={() => {
                    if (!walletConnectSession.isConnected) { console.log('Connect a wallet'); return }
                    
                    // TODO: perform field validation

                    deleteFlow(address, walletConnectSession.provider, walletConnectSession.chainId)
                }}
            >
                Delete Stream
            </button>
        </AbstractWidgetContainer>
    )
}
//bg-gray-600/20