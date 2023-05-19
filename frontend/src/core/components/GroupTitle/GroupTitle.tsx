import React from 'react';
import Typography from '../CustomText/Typhography';

type props = {
    title: any,
    children: any,
    disabled?: boolean,
    bgTitle?:any,
}

function GroupTitle({title, children, disabled = false,bgTitle = 'white'}: props) {
    return (
        <div style={{
            paddingLeft: '10px',
            paddingTop: '20px',
            paddingBottom: '25px',
            border: `1px solid lightgray`,
            borderRadius: '2px',
            marginBottom: '10px',
            marginTop: '10px',
            backgroundColor: 'transparent'
        }}>
            <div style={{display: 'flex'}}>
                <Typography style={{
                    marginTop: '-31px',
                    backgroundColor: bgTitle,
                    borderRadius: '3px',
                    paddingTop: '5px',
                    textAlign: 'center',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                }}>{title}</Typography>
                <div>

                </div>
            </div>
            <div style={{pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.3 : 1}}>{children}</div>
        </div>
    );
}

export default GroupTitle;