
export default function AbstractNavButton(props) {
    return (
        <button 
            className='flex items-center h-full px-4 space-x-4 font-bold rounded-2xl cursor-pointer hover:outline outline-2 outline-gray-100/10'
            style={{
                'backgroundColor': props.color ? props.color : 'black',
                'color': props.textColor ? props.textColor : 'white',
            }}
            onClick={props.onClick && props.onClick}
        >
            {props.children}
        </button>
    )
}