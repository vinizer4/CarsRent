import {useEffect, useState} from 'react'
import {isMobile} from '../../consts'
import {toastGlobal} from "../../utils/toasts";
import Typography from "../CustomText/Typhography";
import {Tooltip} from "devextreme-react";
import IconButton from "../Button/IconButton";
import {AiOutlineArrowLeft} from "react-icons/all";
import {genGuid} from '../../utils/utils';

type props = {
    hiddenArrow?: boolean,
    toolbarActive?: boolean,
    title: string,
    question?: boolean,
    prefix?: string,
    toolbar?: {
        button?: any,
        secondaryActions?: any
    }
}

function HeadTitle({title, question = false, prefix, toolbar, hiddenArrow = false, toolbarActive = false}: props) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
    }, [question])
    const guid = genGuid();
    const toggleWithAnimation = () => setOpen(prevState => !prevState)

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
            paddingRight: '10px'
        }}>
            <div style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}>
                {!hiddenArrow && (<IconButton
                        icon={<AiOutlineArrowLeft size={18}/>}
                        rounded
                        onClick={() => {
                            if (question) {
                                if (window.confirm(`Deseja sair sem salvar da pagina de ${title}?`)) {
                                    history.back();
                                }
                            } else {
                                history.back();
                            }
                        }}
                    />
                )}

                <a id={`titlescrenn${guid}`}
                   onMouseEnter={toggleWithAnimation}
                   onMouseLeave={toggleWithAnimation}
                   onClick={() => {
                       navigator.clipboard.writeText(`${prefix} - ${title}`)
                       toastGlobal('Prefixo copiado para sua área de transferência!')
                   }}> <Typography style={{fontSize: `${isMobile ? '1.8em' : '1.5em'}`}}>{title}</Typography></a>
                <Tooltip target={`#titlescrenn${guid}`} visible={open}>
                    <div style={{
                        cursor: 'pointer'
                    }}>{`${prefix} - ${title}`}</div>
                </Tooltip>
            </div>

            {
                toolbar && (
                    <div style={{display: 'flex', gap: '5px'}}>
                        <>
                            {toolbarActive === true && (
                                <div>{toolbar.button}</div>
                            )}
                            {toolbar.secondaryActions && (<div>{toolbar.secondaryActions}</div>)}
                        </>
                    </div>
                )
            }
        </div>
    )
}

export default HeadTitle