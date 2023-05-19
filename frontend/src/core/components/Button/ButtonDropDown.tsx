import React from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {colorPrimary, colorSave} from "../../consts";
import {ButtonContainer} from "./styes";

type btDD = {
    text: string
    icon?: any,
    type?:'button' | 'submit' | 'reset',
    action?: () => void,
    disabled?:boolean
}

type props = {
    primaryButton?: btDD,
    dropdownText?: any,
    actions?: Array<btDD>,
}

function ButtonDropDown({primaryButton, dropdownText, actions}: props) {
    let {Item} = Dropdown;
    return (
        <ButtonContainer>
            {primaryButton && (
                <Button
                    type={primaryButton.type}
                    style={{backgroundColor: `${colorSave}`}}
                    onClick={primaryButton.action}>
                    {primaryButton.icon} {primaryButton.text}
                </Button>
            )}
            {actions && actions.length > 0 && (<DropdownButton
                as={ButtonGroup} title={dropdownText ? dropdownText: ''}>
                {actions.map((a, i) =>
                    <Item
                        disabled={a.disabled === true}
                        style={{color: `${colorPrimary}`}}
                        key={i + a.text}
                        eventKey={i}
                        onClick={a.action}>
                        {a.icon} {a.text}
                    </Item>)}
            </DropdownButton>)}
        </ButtonContainer>
    );
}

export default ButtonDropDown;