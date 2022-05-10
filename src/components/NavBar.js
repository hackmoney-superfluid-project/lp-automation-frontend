import AbstractNavButton from "./AbstractNavButton";
import TabBar from "./TabBar";
import WCActivateButton from "./walletConnectControls/WCActivateButton";

export default function NavBar() {
    return (
        <div className='flex w-full h-10' >
            <TabBar
                color='#00000055'
                textColor='#EEEEEE'
            />
            <div className='flex grow' />
            <WCActivateButton />
        </div>
    )
}