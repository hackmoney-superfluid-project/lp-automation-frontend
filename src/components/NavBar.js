import AbstractNavButton from "./AbstractNavButton";
import TabBar from "./TabBar";
import WCActivateButton from "./walletConnectControls/WCActivateButton";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0 w-full h-10' >
            <Link
                to={`/`}
                className={'pl-2 pr-2 items-center flex'}
            >
                <img src='./temp_logo.png' className="w-16"/>
            </Link>
            <p className='text-2xl pt-1 pr-8 font-semibold rounded-2xl numbers-font-2 text-white/90'>
                Aqueduct
            </p>
            <div className='flex grow' />
            <TabBar
                color='#00000055'
                textColor='#EEEEEE'
            />
            <div className='flex grow' />
            <WCActivateButton />
        </div>
    )
}