import { useState, useEffect, useContext, createContext } from 'react'
//import Web3 from 'web3'
//import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// create context
const WalletConnectContext = createContext()

// use hook anywhere in component tree to get details about current wallet session
export function useWalletConnect() {
    return useContext(WalletConnectContext)
}

// this context provider allows the wallet address to be passed down the component tree
export default function WalletConnectSessionProvider(props) {

    // states for wallet session
    const [accounts, setAccounts] = useState()
    const [chainId, setChainId] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [connector, setConnector] = useState()
    const [isConnected, setIsConnected] = useState(false)

    // function to create a walletconnect connector
    async function initWalletConnect() {

        const newConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal,
        })

        setConnector(newConnector)

        return newConnector
    }

    // assign connector on component mount
    useEffect(() => {

        async function setupWalletConnect() {
            // Create a connector
            const newConnector = await initWalletConnect()

            // Check if already connected
            setIsConnected(newConnector.connected)
            console.log(newConnector)

            setIsLoaded(true)
        }

        setupWalletConnect()

    }, [])

    // update session when provider changes
    useEffect(() => {

        // subscribe to events that the connector emits
        if (connector) {

            // Subscribe to connection events
            connector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }

                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                setAccounts(accounts)
                setChainId(chainId)
                setIsConnected(true)
            });

            // Subscribe to accounts change
            connector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }

                // Get updated accounts and chainId
                const { accounts, chainId } = payload.params[0];
                setAccounts(accounts)
                setChainId(chainId)
            });

            // Subscribe to session disconnection
            connector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }

                // reset state
                setConnector(undefined)
                setAccounts(undefined)
                setChainId(undefined)
                setIsConnected(false)
            });
        }
    }, [connector])

    async function connectWalletAndUpdateStatus() {

        // return if already connected
        if (isConnected) { return }

        setIsLoaded(false)
        const newConnector = await initWalletConnect() // we need to re-init the connector for the modal to show for a second time
        await newConnector.createSession();
        //await connector.connect()
        setIsLoaded(true)
    }

    async function disconnectWalletAndUpdateStatus() {

        // return if not connected
        if (!isConnected) { return }

        setIsLoaded(false)
        //const newConnector = await initWalletConnect() // we need to re-init the connector for the modal to show for a second time
        await connector.killSession()
        setIsLoaded(true)
    }

    return (
        <WalletConnectContext.Provider value={{
            connect: connectWalletAndUpdateStatus,
            disconnect: disconnectWalletAndUpdateStatus,
            accounts: accounts,
            chainId: chainId,
            connector: connector,
            isLoaded: isLoaded,
            isConnected: isConnected
        }}>
            {props.children}
        </WalletConnectContext.Provider>
    )
}