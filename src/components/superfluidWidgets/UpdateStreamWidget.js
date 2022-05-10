import { useEffect, useState } from "react";
import updateExistingFlow from "../../utils/superfluidFunctions/updateStream";
import { useWalletConnect } from "../../utils/WalletConnectSessionWeb3Provider";
import AbstractWidgetContainer from "../AbstractWidgetContainer";
import AddressEntryField from "./AddressEntryField";
import NumberEntryField from "./NumberEntryField";

export default function UpdateStreamWidget() {

    // form states
    const [address, setAddress] = useState('');
    const [flowRate, setFlowRate] = useState('');

    // get current wallet session
    const walletConnectSession = useWalletConnect();

    return (
        <AbstractWidgetContainer
            title='Update Stream'
            color='#00000066'
            textColor='#EEEEEE'
        >
            <AddressEntryField title='Address' address={address} setAddress={setAddress} />
            <NumberEntryField title='FlowRate ( wei / sec )' number={flowRate} setNumber={setFlowRate} />
            <button 
                className='h-14 bg-blue-500/75 font-bold rounded-2xl hover:outline outline-2 outline-gray-100/10'
                onClick={() => {
                    if (!walletConnectSession.isConnected) { console.log('Connect a wallet'); return }
                    
                    // TODO: perform field validation

                    updateExistingFlow(address, flowRate, walletConnectSession.provider, walletConnectSession.chainId)
                }}
            >
                Update Stream
            </button>
        </AbstractWidgetContainer>
    )
}
//bg-gray-600/20