import { useState, useEffect, useContext, createContext } from 'react'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
//import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";

// create context
const WalletConnectContext = createContext()

// use hook anywhere in component tree to get details about current wallet session
export function useWalletConnect() {
    return useContext(WalletConnectContext)
}

// this context provider allows the wallet address to be passed down the component tree
export default function WalletConnectSessionWeb3Provider(props) {

    // states for wallet session
    const [accounts, setAccounts] = useState()
    const [chainId, setChainId] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [provider, setProvider] = useState()
    const [isConnected, setIsConnected] = useState(false)

    // function to create a walletconnect connector
    async function initWalletConnect() {

        const newProvider = new WalletConnectProvider({
            //infuraId: "627d53e500bf4f58839c5fd0588df224",
            rpc: {
                80001: 'https://rpc-mumbai.maticvigil.com'
            }
        })

        setProvider(newProvider)

        return newProvider
    }

    // assign provider on component mount
    useEffect(() => {

        async function setupWalletConnect() {
            // Create a provider
            const newProvider = await initWalletConnect()

            // Check if already connected
            setIsConnected(newProvider.connector.connected)
            
            if (newProvider.connector.connected) {
                setAccounts(newProvider.connector.accounts)
                setChainId(newProvider.connector.chainId)
            }

            setIsLoaded(true)
        }

        setupWalletConnect()

    }, [])

    // update session when provider changes
    useEffect(() => {
        if (provider && provider.connector.connected) { 
            provider.enable() 
            setIsConnected(true)
        }
        if (provider) {

            // Subscribe to connection events
            provider.connector.on("connect", (error, payload) => {
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
            provider.on("accountsChanged", (accounts) => {
                setAccounts(accounts)
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                setChainId(chainId)
            });

            // Subscribe to session disconnection
            provider.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }

                // reset state
                setProvider(undefined)
                setAccounts(undefined)
                setChainId(undefined)
                setIsConnected(false)
            });
        }
    }, [provider])

    async function connectWalletAndUpdateStatus() {

        // return if already connected
        if (isConnected) { return }

        setIsLoaded(false)
        const newProvider = await initWalletConnect() // we need to re-init the provider for the modal to show for a second time
        await newProvider.enable();
        //await connector.connect()
        setIsLoaded(true)
    }

    async function disconnectWalletAndUpdateStatus() {

        // return if not connected
        if (!isConnected) { return }

        setIsLoaded(false)
        //const newConnector = await initWalletConnect() // we need to re-init the connector for the modal to show for a second time
        await provider.connector.killSession()
        setIsLoaded(true)
    }

    return (
        <WalletConnectContext.Provider value={{
            connect: connectWalletAndUpdateStatus,
            disconnect: disconnectWalletAndUpdateStatus,
            accounts: accounts,
            chainId: chainId,
            provider: provider,
            isLoaded: isLoaded,
            isConnected: isConnected
        }}>
            {props.children}
        </WalletConnectContext.Provider>
    )
}