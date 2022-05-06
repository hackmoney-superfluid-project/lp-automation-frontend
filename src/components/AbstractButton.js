
export default function AbstractButton(props) {
    return (
        <button 
            className="abstract-button"
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