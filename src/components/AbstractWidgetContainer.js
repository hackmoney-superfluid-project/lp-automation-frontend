
export default function AbstractWidgetContainer(props) {
    return (
        <div 
            className='flex flex-col w-full max-w-lg pt-4 pb-2 px-2 space-y-2 rounded-3xl shadow-2xl' 
            style={{
                'backgroundColor': props.color ? props.color : 'black',
                'color': props.textColor ? props.textColor : 'white',
            }}
        >
            <div className="flex font-bold pb-2 pl-3">
                {props.title}
            </div>
            {
                props.children
            }
        </div>
    )
}