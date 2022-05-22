
import { useEffect, useState } from "react";
import Web3 from "web3"

export function isValidAddress(address) {
    return Web3.utils.isAddress(address);
}

export default function AddressEntryField({ address, setAddress, title }) {

    // state for tracking if valid address
    const [validAddress, setValidAddress] = useState(true)

    // check address validity whenever field is updated
    useEffect(() => {
        if (address) {
            setValidAddress(isValidAddress(address))
        }
    }, [address])

    return (
        <div className="">
            <div className="absolute pl-4 pt-3 text-xs font-semibold text-gray-400/50">
                {title}
            </div>
            <input
                style={!validAddress ? {
                    'outlineStyle': 'solid',
                    'outlineColor': '#c4322d'
                } : {}}
                //className='h-20 text-2xl font-semibold bg-gray-600/20 rounded-2xl px-4 numbers-font-2'
                className='h-20 text-2xl w-full pt-6 font-semibold bg-white/5 rounded-2xl px-4 numbers-font-2'
                type="text"
                placeholder="ex: 0xabc123..."
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
            />
        </div>
    )
}