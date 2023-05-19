import React, {useState} from 'react';
import {Popup} from 'devextreme-react';

type props = {
    width?: number | string,
    height?: number | string,
    showTitle?: boolean,
    title?: string,
    hideOnOutsideClick?: boolean,
    content?: any,
    open?: boolean,
    handleClose: any,
    showCloseButton?: boolean,
    refController?: any
}

function CustomModal({
                         width = '80%',
                         height = '80%',
                         showTitle = true,
                         title = 'Modal',
                         hideOnOutsideClick = true,
                         content,
                         open,
                         handleClose,
                         showCloseButton = true,
                         refController
                     }: props) {
    const [openM, setOpenM] = useState(true);

    const contentRender = () => <>{openM && (content)}</>;

    let defaultProps = {
        ref: refController,
        width: width,
        height: height,
        showTitle: showTitle,
        title: title,
        dragEnabled: false,
        hideOnOutsideClick: hideOnOutsideClick,
        showCloseButton: showCloseButton,
        onInitialized: (e: any) => {
            if (hideOnOutsideClick === false) {
                e.component.registerKeyHandler('escape', function (arg: any) {
                    arg.stopPropagation();
                });
            }
        },
        onShowing: () => setOpenM(true),
        onHiding: () => {
            handleClose();
            setOpenM(false);
        },
        contentRender: contentRender,
    };

    return (
        <>
            <Popup {...defaultProps} />
        </>
    );
}

export default CustomModal;