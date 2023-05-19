import React from 'react';
import {AvatarContainer} from "./styles";

type props = {
    title:string,
    image?:string
}

function Avatar({title,image}:props) {
    return (
        <AvatarContainer>
            {image ? (
                <img alt={'avatar'} src={image} />
            ):
                (
                    <div className={'nameAvatar'}>
                        {title[0].toUpperCase()}
                    </div>
                )}
        </AvatarContainer>
    );
}

export default Avatar;