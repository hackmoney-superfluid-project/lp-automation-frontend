
import { useEffect, useState } from "react";
import Web3 from "web3"

export function isValidNumber() {
    return true;
}

export default function NumberEntryField({ number, setNumber, title }) {

    // state for tracking if valid number
    const [validNumber, setValidNumber] = useState(true)

    // check address validity whenever field is updated
    useEffect(() => {
        if (number) {
            setValidNumber(isValidNumber(number))
        }
    }, [number])

    return (
        <div className="">
            <div className="absolute pl-4 pt-3 text-xs font-semibold text-gray-400/50">
                {title}
            </div>
            <input
                style={!validNumber ? {
                    'outlineStyle': 'solid',
                    'outlineColor': '#c4322d'
                } : {}}
                className='h-20 text-2xl w-full pt-6 font-semibold bg-gray-600/20 rounded-2xl px-4 numbers-font-2'
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0.0"
                value={number ? number : ''}
                onChange={(e) => {
                    if (e.target.value.match("^[0-9]*[.]?[0-9]*$") != null) {
                        setNumber(e.target.value)
                    }
                }}
            />
        </div>
    )
}