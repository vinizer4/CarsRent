import React, {useEffect, useRef, useState} from 'react';
import {FindModalContainer} from './styles';
import {Form, InputGroup} from 'react-bootstrap';
import {AiFillStar, AiOutlineStar, IoIosSearch} from 'react-icons/all';
import {colorPrimary, findScreen} from '../../consts';
import IconButton from '../Button/IconButton';
import {IconContext} from 'react-icons';
import {findIn, genGuid, isFilledArray} from '../../utils/utils';
import debounce from 'lodash.debounce';
import Typography from '../CustomText/Typhography';
import {history} from '../../history';
import {closeModal} from '../CustomModal/CustomModalHelper';
import {ScrollView} from 'devextreme-react';

type props = {
    modalRef: any
}

function FindModal({modalRef}: props) {
    const keyStore = '@slwFavoriteScreens';
    const keyRecents = '@slwRecentsScreens';

    const [favorites, setFavorites] = useState<Array<string>>([]);
    const [filtered, setFiltered] = useState<Array<any>>([]);
    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const formRef = useRef(null);
    useEffect(() => {
        updateFavorites();
    }, []);

    const getScreens = () => {
        const data = localStorage.getItem(keyStore);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    const setScreens = (prefix: string) => {
        let data = getScreens();
        if (isFilledArray(data)) {
            if (data.includes(prefix)) {
                data = data.filter((data: string) => data !== prefix);
            } else {
                data.push(prefix);
            }
        } else {
            data = [prefix];
        }
        localStorage.setItem(keyStore, JSON.stringify(data));
        updateFavorites();
    };

    const getRecentScreens = () => {
        const data = localStorage.getItem(keyRecents);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    const setRecentScreens = (prefix: string) => {
        let data = getRecentScreens();
        if (isFilledArray(data)) {
            if (!data.includes(prefix)) {
                if (data.length >= 5) data.pop();
                data.unshift(prefix);
                localStorage.setItem(keyRecents, JSON.stringify(data));
            }
        } else {
            data = [prefix];
            localStorage.setItem(keyRecents, JSON.stringify(data));
        }
    };


    const updateFavorites = () => setFavorites(getScreens());

    const gotoScreen = (path: string, prefix: string) => {
        history.push(path);
        closeModal(modalRef);
        setRecentScreens(prefix);
        setSearchString(undefined);
    };

    const cardItem = (item: { prefix: string, name: string, path: string, info?: string }, actEnable: boolean = true) => {
        const guid = genGuid();
        return (
            <div className={'cardItem'} key={guid}>
                <div className={'description'} onClick={() => {
                    gotoScreen(item.path, item.prefix);
                }}>
                    <div className={'title'}>
                        {item.prefix} {item.name}
                    </div>
                    <div className={'info'}>
                        {item.info}
                    </div>
                </div>
                {actEnable && (<div className={'actions'}>

                    <IconButton onClick={() => setScreens(item.prefix)} icon={
                        <IconContext.Provider value={{color: colorPrimary}}>
                            {favorites.includes(item.prefix) ? <AiFillStar size={20}/> : <AiOutlineStar size={20}/>}
                        </IconContext.Provider>
                    }/>
                </div>)}
            </div>
        );
    };

    const renderCardFavorites = () => {
        let render = findScreen.filter((item) => favorites.includes(item.prefix)).map((item) => cardItem(item));
        if (!isFilledArray(render)) {
            return (<div className={'naoencontrado'}>
                <Typography style={{fontSize: '1.2em'}}>Você ainda não tem uma tela favorita 🙁</Typography>
                <Typography style={{fontSize: '1.2em'}}>Utilize a barra de busca para encontrar a tela
                    desejada</Typography>
            </div>);
        }
        return render;
    };
    const renderFilterCard = () => {
        let render = findScreen.filter((item) => {
            let str = item.prefix + item.name + (item.info ? item.info : '');
            return str.toLocaleUpperCase().includes(searchString!.toLocaleUpperCase());
        }).map((item) => cardItem(item));
        if (!isFilledArray(render)) {
            return <div className={'naoencontrado'}><Typography style={{fontSize: '1.2em'}}>Não Foram Encontrados
                Resultados 🙁</Typography></div>;
        }
        return render;
    };

    const searchBounce = debounce((query: string) => {
        if (query !== undefined) {
            setSearchString(query);
        }
    }, 500);

    const render = () => {
        if (searchString === undefined) {
            return renderCardFavorites();
        } else {
            if (searchString === '') {
                return renderCardFavorites();
            } else {
                return renderFilterCard();
            }
        }
    };

    const renderRecents = () => {

        let render = getRecentScreens().map((prefix:string)=>  cardItem(findIn(findScreen,'prefix',prefix,false)));
        if (!isFilledArray(render)) {
            return <>
                <hr/>
                <div className={'naoencontrado'}>
                    <Typography style={{fontSize: '1.2em'}}>Sem telas recentes 🙁</Typography>
                </div>
            </>;
        } else {
            return <>
                <hr/>
                <div className={'naoencontrado'}><Typography style={{fontSize: '1.2em'}}>Acessos Recentes</Typography>
                </div>
                {render}
            </>;
        }

    };

    return (
        <FindModalContainer>
            <div>
                <InputGroup>
                    <Form.Control
                        ref={formRef}
                        placeholder="Busque uma tela por nome ou prefixo"
                        onChange={(e) => {
                            searchBounce(e.target.value);
                        }}
                    />
                    <InputGroup.Text><IoIosSearch
                        size={20}/></InputGroup.Text>
                </InputGroup>
            </div>
            <hr/>
            <ScrollView height={'calc(90vh - 100px)'}>
                <div className={'items'}>
                    {render()}
                    {renderRecents()}
                </div>
            </ScrollView>
        </FindModalContainer>
    );
}

export default FindModal;