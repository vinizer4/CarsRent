import React, {useEffect, useState} from 'react';
import {FilterContainer, FilterItem} from './styles';
import {DateBox} from 'devextreme-react';
import Typography from '../../CustomText/Typhography';
import {AiOutlineClose, ImFilter, RiFilterFill} from 'react-icons/all';
import ButtonDropDown from '../../Button/ButtonDropDown';
import Select from 'react-select';
import axios from 'axios';
import {EmpresaService} from '../../../service/module/pessoas/Empresa';
import {PessoasService} from '../../../service/module/pessoas/PessoasService';
import {isFilledArray} from '../../../utils/utils';
import {isSucess} from '../../../utils/restUtil';
import {endOfMonth, getMonth, getYear, subDays} from 'date-fns';
import IconButton from '../../Button/IconButton';
import {isMobile} from '../../../consts';
import {toastError} from '../../../utils/toasts';

export type IFilterValues = {
    company: Array<any>,
    seller: Array<any>,
    dini: Date,
    dfin: Date,
}

type props = {
    onFilter: (values: IFilterValues) => void
}

export const initialValues = {
    company: [{'Código': 0, 'Razão Social': 'Todos'}],
    seller: [{'Código': 0, 'Razão Social': 'Todos'}],
    dini: new Date(),
    dfin: new Date(),
};

function CustomFilter({onFilter}: props) {
    const [show,setShow] = useState(true)
    const [filterValues, setFilterValues] = useState<IFilterValues>(initialValues);
    const [data, setData] = useState({
        company: [],
        seller: [],
    });

    async function handleData() {
        if (!isFilledArray(data.company) && !isFilledArray(data.seller)) {
            const [company, seller] = await axios.all([
                EmpresaService.GetAll(),
                PessoasService.GetFuncionarios()
            ]);

            if ((company && isSucess(company.status)) && (seller && isSucess(seller.status))) {
                let companyD = [{'Código': 0, 'Razão Social': 'Todos'}].concat(company.data);
                let sellerD = [{'Código': 0, 'Razão Social': 'Todos'}].concat(seller.data);
                setData({
                    company: companyD && companyD as any,
                    seller: sellerD && sellerD as any
                });
            }
        }
    }

    function filterMultiSelect(newValue: any, actionMeta: any) {
        if (actionMeta.action === 'select-option') {
            if ((newValue.filter((o: any) => o['Código'] === 0)).length > 0) {
                if (actionMeta.option['Código'] !== 0) {
                    return newValue.filter((o: any) => o['Código'] !== 0);
                } else {
                    return newValue.filter((o: any) => o['Código'] === 0);
                }
            } else {
                return (newValue as any);
            }
        } else if (actionMeta.action === 'clear') {
            return undefined;
        }else{
            return newValue;
        }
    }

    function handleDataPreFilters(filterValue: number) {
        switch (filterValue) {
            case 0: {  //HOJE
                setFilterValues(prevState => {
                    return {...prevState, dini: new Date(), dfin: new Date()};
                });
                break;
            }
            case 1: {   //ESTE ANO
                setFilterValues(prevState => {
                    return {
                        ...prevState,
                        dini: (new Date(`01/01/${getYear(new Date())}`)),
                        dfin: new Date(`12/31/${getYear(new Date())}`)
                    };
                });
                break;
            }
            case 2: {    //ULTIMOS 7 DIAS
                setFilterValues(prevState => {
                    return {
                        ...prevState,
                        dini: new Date(subDays(new Date(), 7)),
                        dfin: new Date()
                    };
                });
                break;
            }
            case 3: {    //ULTIMOS 30 DIAS
                setFilterValues(prevState => {
                    return {
                        ...prevState,
                        dini: new Date(subDays(new Date(), 30)),
                        dfin: new Date()
                    };
                });
                break;
            }
            case 4: {    //MÊS ANTERIOR
                setFilterValues(prevState => {
                    return {
                        ...prevState,
                        dini: new Date(`${getMonth(new Date()) !== 1 ? new Date().getMonth() : 12}/01/${getYear(new Date())}`),
                        dfin: new Date(endOfMonth(new Date(`${getMonth(new Date()) !== 1 ? new Date().getMonth() : 12}/01/${getYear(new Date())}`)))
                    };
                });
                break;
            }
            case 5: {    //MÊS ANTERIOR
                setFilterValues(prevState => {
                    return {
                        ...prevState,
                        dini: (new Date(`01/01/${getYear(new Date()) - 1}`)),
                        dfin: new Date(`12/31/${getYear(new Date()) - 1}`)
                    };
                });
                break;
            }

        }
    }

    function triggerFilter() {
        console.log(filterValues)
        if(filterValues.dfin && filterValues.dini && isFilledArray(filterValues.company) && isFilledArray(filterValues.seller)){
            onFilter(filterValues);
        }else{
            toastError('Preencha as informações para filtrar');
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <>
            { show ? (<FilterContainer>

                <div className={'start'}>
                    <FilterItem>
                        <div style={{width: 250}}>
                            <Typography>Empresas</Typography>
                            <Select
                                classNamePrefix={'react-select'}
                                className={'react-select_container'}
                                options={data.company}
                                getOptionLabel={(option: any) => option['Razão Social']}
                                getOptionValue={(option: any) => option['Código']}
                                isMulti
                                placeholder={'Selecione as empresas'}
                                value={filterValues?.company}
                                onChange={(a, b) => {
                                    setFilterValues(prevState => {
                                        return {
                                            ...prevState,
                                            company: filterMultiSelect(a, b)
                                        };
                                    });
                                }}
                            />
                        </div>
                    </FilterItem>

                    <FilterItem>
                        <div style={{width: 250}}>
                            <Typography>Vendedores</Typography>
                            <Select
                                classNamePrefix={'react-select'}
                                options={data.seller}
                                getOptionLabel={(option: any) => option['Razão Social']}
                                getOptionValue={(option: any) => option['Código']}
                                isMulti
                                placeholder={'Selecione os vendedores'}
                                value={filterValues?.seller}
                                onChange={(a, b) => {
                                    setFilterValues(prevState => {
                                        return {
                                            ...prevState,
                                            seller: filterMultiSelect(a, b)
                                        };
                                    });
                                }}
                            />
                        </div>
                    </FilterItem>

                    <FilterItem>
                        <Typography>Data inicial</Typography>
                        <DateBox type={'date'}
                                 value={filterValues.dini}
                                 onValueChange={(e) => {
                                     setFilterValues(prevState => {
                                         return {
                                             ...prevState,
                                             dini: e
                                         };
                                     });
                                 }}
                        />
                    </FilterItem>

                    <FilterItem>
                        <Typography>Data final</Typography>
                        <DateBox
                            type={'date'}
                            value={filterValues.dfin}
                            onValueChange={(e) => {
                                setFilterValues(prevState => {
                                    return {
                                        ...prevState,
                                        dfin: new Date(e)
                                    };
                                });
                            }}
                        />
                    </FilterItem>
                </div>

                <div className={'end'}>
                    <FilterItem>
                        <ButtonDropDown
                            primaryButton={{
                                type: 'button',
                                text: 'filtrar',
                                icon: <RiFilterFill/>,
                                action: triggerFilter
                            }}
                            actions={[
                                {text: 'Hoje', action: () => handleDataPreFilters(0)},
                                {text: 'Este ano', action: () => handleDataPreFilters(1)},
                                {text: 'Ultimos 7 dias', action: () => handleDataPreFilters(2)},
                                {text: 'Ultimos 30 dias', action: () => handleDataPreFilters(3)},
                                {text: 'Mês anterior', action: () => handleDataPreFilters(4)},
                                {text: 'Ano passado', action: () => handleDataPreFilters(5)},
                                {text: 'Personalizado'},
                            ]}
                        />
                    </FilterItem>

                    { isMobile  && (<FilterItem>
                        <IconButton text={'Fechar'} icon={<AiOutlineClose/>} onClick={() => setShow(false)}/>
                    </FilterItem>)}
                </div>

                {/*<FilterItemCentered>*/}
                {/*    <Typography>Limpar filtros</Typography>*/}
                {/*    <IconButton icon={<RiFilterOffFill/>}/>*/}
                {/*</FilterItemCentered>*/}

                {/*<FilterItemCentered>*/}
                {/*    <Typography>Recalcular automaticamente</Typography>*/}
                {/*    <Switch style={{margin: 8}}/>*/}
                {/*</FilterItemCentered>*/}

            </FilterContainer>)
            :
                (
                    <IconButton  icon={<ImFilter/>} onClick={()=>setShow(true)}/>
                )
            }
        </>
    );
}

export default CustomFilter;