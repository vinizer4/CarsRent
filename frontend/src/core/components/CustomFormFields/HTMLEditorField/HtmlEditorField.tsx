import { Controller } from 'react-hook-form';
import Typography from "../../CustomText/Typhography";
import {HtmlEditor} from "devextreme-react";
import {ImageUpload, Item, MediaResizing, Toolbar} from "devextreme-react/html-editor";

type props = {
    onBefore?: any,
    onAfter?: any,
    nameField?: any,
    label?: any,
    control:any,
    height?:any
}

function HtmlEditorField({ onBefore, onAfter, nameField, label,control,height ='400px' }: props) {
    const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
    const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
    const headerValues = [false, 1, 2, 3, 4, 5];
    return (
        <>
            <Typography>{label}</Typography>
            <Controller
                render={({
                    field: { onChange, onBlur, value, name, ref},
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                }) => (
                    <>
                        <HtmlEditor
                            height={height}
                            width={'100%'}
                            value={value}
                            onValueChange={(values: any) => {
                                onBefore && onBefore(values);
                                onChange(values)
                                onAfter && onAfter(values);
                            }}
                            onFocusOut={onBlur}
                        >
                            <MediaResizing enabled={true} />
                            <ImageUpload tabs={['url']} fileUploadMode="base64" />
                            <Toolbar multiline={false}>
                                <Item name="undo" />
                                <Item name="redo" />
                                <Item name="separator" />
                                <Item
                                    name="size"
                                    acceptedValues={sizeValues}
                                />
                                <Item
                                    name="font"
                                    acceptedValues={fontValues}
                                />
                                <Item name="separator" />
                                <Item name="bold" />
                                <Item name="italic" />
                                <Item name="strike" />
                                <Item name="underline" />
                                <Item name="separator" />
                                <Item name="alignLeft" />
                                <Item name="alignCenter" />
                                <Item name="alignRight" />
                                <Item name="alignJustify" />
                                <Item name="separator" />
                                <Item name="orderedList" />
                                <Item name="bulletList" />
                                <Item name="separator" />
                                <Item
                                    name="header"
                                    acceptedValues={headerValues}
                                />
                                <Item name="separator" />
                                <Item name="color" />
                                <Item name="background" />
                                <Item name="separator" />
                                <Item name="link" />
                                <Item name="image" />
                                <Item name="separator" />
                                <Item name="clear" />
                                <Item name="codeBlock" />
                                <Item name="blockquote" />
                                <Item name="separator" />
                                {/*<Item name="insertTable" />*/}
                                {/*<Item name="deleteTable" />*/}
                                {/*<Item name="insertRowAbove" />*/}
                                {/*<Item name="insertRowBelow" />*/}
                                {/*<Item name="deleteRow" />*/}
                                {/*<Item name="insertColumnLeft" />*/}
                                {/*<Item name="insertColumnRight" />*/}
                                {/*<Item name="deleteColumn" />*/}
                            </Toolbar>
                        </HtmlEditor>
                        {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
                    </>)
                }
                control={control}
                name={nameField}
            />
        </>
    )
}

export default HtmlEditorField