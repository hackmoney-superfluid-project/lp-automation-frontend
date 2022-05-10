
import { useEffect } from "react";
import {
    Link,
    useMatch
} from "react-router-dom";

export default function TabBar(props) {
    return (
        
            <div
                className="flex flex-shrink-0 items-center h-10 px-1 py-1 space-x-1 font-bold rounded-2xl"
                style={{
                    'backgroundColor': props.color ? props.color : 'black',
                    'color': props.textColor ? props.textColor : 'white',
                }}
            >
                <TabButton text='Create' paramName='create' buttonColor={props.buttonColor} />
                <TabButton text='Update' paramName='update' buttonColor={props.buttonColor} />
                <TabButton text='Delete' paramName='delete' buttonColor={props.buttonColor} />
            </div>
        
    )
}

function TabButton({ text, paramName, buttonColor }) {

    const path = useMatch("/:slug")?.pathname?.substring(1);

    return (
        <Link
            to={`/${paramName}`}
            className={(path == paramName ? ' bg-gray-500/20 ' : ' bg-transparent ') + 'h-full rounded-xl px-4 font-bold flex grow justify-center items-center transition-all duration-500'}
        >
            {text}
        </Link>
    )
}