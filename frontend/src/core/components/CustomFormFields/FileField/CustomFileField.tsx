import React, {useState} from 'react';
import {FileUploader} from 'devextreme-react';
import {FileUploaderContainer} from './styles';
import Typography from '../../CustomText/Typhography';
import {Controller} from 'react-hook-form';
import {colorDelete} from '../../../consts';
import {getFromS3} from '../../../utils/utils';

type props = {
    nameField: string,
    label: string,
    onBeforeChange?: any
    onAfterChange?: any,
    control: any,
    readOnly?: boolean,
    disabled?: boolean,
    width?: any,
    heigth?: any
    type?: 'blob' | 'url'
}

function CustomFileField({
                             label,
                             nameField,
                             onAfterChange,
                             onBeforeChange,
                             control,
                             readOnly = false,
                             disabled = false,
                             width = '150px',
                             heigth = '150px',
                             type = 'blob'
                         }: props) {
    const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

    function onUploaded(e: Array<File>, onChange: any) {
        const file = e[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            onChange((fileReader.result as string).split(',')[1]);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <Controller
            render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error},
                         formState,
                     }) => {

                const loadImg = (value:string) =>{
                    if (type === 'url'){
                        return getFromS3(value)
                    }else{
                       return 'data:image;base64,' + value;
                    }
                }
                return (
                    <>
                        <FileUploaderContainer>
                            <div className="widget-container flex-box">
                                <Typography>{label}</Typography>
                                <div id={`triggerField${nameField}`} style={{width: width, height: heigth}}>
                                    <div id={'dropzone-external'}
                                         style={{width: width, height: heigth}}
                                         className={`flex-box dx-theme-border-color`}>
                                        {value && <img id="dropzone-image" src={loadImg(value)} alt=""/>}
                                        {!value
                                            && <div id="dropzone-text" className="flex-box">
                                                <span>Arraste e solte o arquivo aqui</span>
                                                <span>…ou clique para procurar.</span>
                                            </div>}
                                    </div>
                                </div>
                                <FileUploader
                                    id="file-uploader"
                                    dialogTrigger={`#triggerField${nameField}`}
                                    dropZone={`#triggerField${nameField}`}
                                    multiple={false}
                                    allowedFileExtensions={allowedFileExtensions}
                                    uploadMode="instantly"
                                    visible={false}
                                    onValueChange={(e: Array<File>) => onUploaded(e, onChange)}
                                ></FileUploader>
                                {value && (<a style={{color: colorDelete, cursor: 'pointer'}}
                                              onClick={() => onChange(undefined)}>remover</a>)}
                            </div>
                        </FileUploaderContainer>
                        {(error) && (<Typography style={{color: 'red'}}><small>{error.message}</small></Typography>)}
                    </>);
            }
            }
            control={control}
            name={nameField}
        />
    );
}

export default CustomFileField;