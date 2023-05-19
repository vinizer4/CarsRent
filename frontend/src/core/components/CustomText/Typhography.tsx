import {CSSProperties, ReactNode} from 'react';

type props = {
    children : ReactNode,
    style?:CSSProperties
}

function Typography({children,style}:props) {
    return (
        <div style={style} >{children}</div>
    );
}

export default Typography;