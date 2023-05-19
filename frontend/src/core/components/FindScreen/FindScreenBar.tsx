import React, {ReactNode, useRef} from 'react';
import Typography from '../CustomText/Typhography';
import {colorFontW, colorSoftGray, isMobile} from '../../consts';
import {IoIosSearch} from 'react-icons/all';
import {Popup} from 'devextreme-react';
import FindModal from './FindModal';
import {openModal} from '../CustomModal/CustomModalHelper';
import {FindScreenBarContainer} from './styles';

function FindScreenBar() {
    const modalRef = useRef(null);
    return (
        <FindScreenBarContainer>
            <div
                onClick={() => openModal(modalRef)}
                style={{
                    padding: '6px 25px 6px 25px',
                    border: 'solid 2px rgba(255,255,255,.20)',
                    borderRadius: 4
                }}>
                <Typography style={{fontSize: '1.2em', color: colorFontW}}>Procurar uma tela <IoIosSearch
                    size={20}/></Typography>
            </div>

            <Popup
                ref={modalRef}
                position={'top'}
                showTitle={false}
                width={isMobile ? '90%' : '30%'}
                dragEnabled={false}
                hideOnOutsideClick={true}
                height={'90vh'}
            >
                <FindModal modalRef={modalRef} />
            </Popup>
        </FindScreenBarContainer>
    );
}

export default FindScreenBar;