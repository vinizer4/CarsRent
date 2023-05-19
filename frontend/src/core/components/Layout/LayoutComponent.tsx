import React, {memo, useEffect, useState} from 'react';
import {FadeTile, LayoutContainer, Navbar, ScrollDrawerView, TileMenu} from "./styles";
import {Navigate, Outlet} from "react-router-dom";
import {Drawer} from "devextreme-react";
import {navigation} from "../../NavBarConfig";
import {BsArrowsCollapse, BsArrowsExpand, GiHamburgerMenu} from "react-icons/all";
import {isAuth} from "../../utils/security/isCrypto";
import IconButton from "../Button/IconButton";
import {colorFontW, colorPrimary, isMobile} from "../../consts";
import Avatar from "../Avatar/Avatar";
import avatar from '../../assets/image/avatar.jpg'
import Notify from "../Notify/Notify";
import {LoadingProvider, useLoadingContext} from '../../hook/loadingContext';
import Typography from "../CustomText/Typhography";
import {history} from "../../history";
import packageJson from '../../../package.json'
import logo from '../../assets/image/logo.svg'
import {useGlobalLoaderContext} from '../../hook/GlobalLoader';
import {findIn} from '../../utils/utils';
import {isAllowedAction} from '../../utils/security/isAllowed';
import {permitions} from '../../App';
import FindScreenBar from '../FindScreen/FindScreenBar';

function LayoutComponent(){
    const [config,setConfig] = useState({
        opened: false,
        openedStateMode: 'push',
        revealMode: 'slide',
        position: 'left',
        minSize:50
    });
    const {module,activateModule} = useGlobalLoaderContext();

    const handleOpen = () => setConfig(prevState => {
            return {...prevState, opened: !prevState.opened}
        });

    const setOpenDrawer = () => {
        if (!config.opened) setConfig({...config,opened: true})
    }
    const setClosedDrawer = () => {
        if (config.opened) setConfig({...config,opened: false})
    }

    const toolbarItems = [
        {
        widget: 'dxButton',
        location: 'before',
        options: {
            icon: 'menu',
            onClick: () => handleOpen(),
        },
    },{
        widget: 'dxButton',
        location: 'after',
        options: {
            icon: 'menu',
            onClick: () => handleOpen(),
        },
    }
    ];

    function openGlobalLoader(module:string) {
        activateModule && activateModule(module)
    }

    function ItemList ({name,action,icon,items,active = true}:propItem){
        const [open,setOpen] = useState(false)
        const handleClick = () =>{
            if(items){
                setOpenDrawer()
                setOpen(prevState => !prevState)
            }else{
                action && action()
                setClosedDrawer()
            }
        }
        return(
            <TileMenu>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between',padding:'15px',paddingLeft:'15px'}} className={'dx-theme-background-color'} onClick={()=> active && handleClick()}>
                    <div style={{display:'flex',gap:'20px'}}>
                        {icon && (<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>{icon}</div>)}
                        <div>{name}</div>
                    </div>
                    {items && (<div> {open ? <BsArrowsCollapse/> :<BsArrowsExpand />} </div>)}
                </div>
                {
                    (config.opened && open) && (
                        <FadeTile>
                            {
                                items?.map((i,index)=> i.active !== false && <ItemList {...i} key={index+i.name} />)
                            }
                        </FadeTile>
                    )
                }
            </TileMenu>
        )
    }

    useEffect(()=>{
        verify(window.location)
    },[])

    function verify(location:any) {
        let strings = location.pathname.split('/');
        strings = strings.filter((v: string) => {
            return isNaN(Number(v));
        });
        let serchable = strings.toString().replaceAll(',', '');
        let element = findIn(permitions, 'path', serchable, false);
        if (element.path !== undefined) {
            if (!isAllowedAction(element.action)) {
                window.location.replace('/acess-denied');
            }
        }
    }

    const MenuList = () => <ScrollDrawerView >{navigation(openGlobalLoader).map((i, index) => i.active !== false && (<div key={index + i.name} style={{borderBottom:'1px solid #cccccc'}}><ItemList {...i} /></div>))}</ScrollDrawerView>

    return(
        <>
            {isAuth() === null ? <Navigate to={'/login'}/> :
                (
                    <LayoutContainer>
                        <LoadingProvider>
                            <Navbar>
                                <div className={'nav_left'}>
                                    <IconButton icon={<GiHamburgerMenu size={20} color={colorFontW}/>} onClick={handleOpen} />
                                    <img src={logo} style={{width:'90px'}}/>
                                   <div style={{
                                       borderLeft:'1px solid white',
                                       height:'35px'
                                   }}></div>
                                    <a onClick={()=>history.push('/dashboard')} style={{cursor:'pointer'}}>
                                        <Typography style={{fontSize: isMobile ? '1.0em' : '1.5em', color: `${colorFontW}`,width:'150px',display:'flex',flexDirection:'column'}}>SGC Litos Web <small>Versão Alpha {packageJson.version}</small></Typography>
                                    </a>
                                </div>

                                <div className={'nav_center'}>
                                    <FindScreenBar/>
                                </div>

                                <div className={'nav_right'}>
                                    <Notify/>
                                    <Avatar title={'Yango'} image={avatar}/>
                                </div>
                            </Navbar>
                            <Drawer
                                opened={config.opened}
                                openedStateMode={config.openedStateMode as any}
                                position={config.position as any}
                                revealMode={config.revealMode as any}
                                component={MenuList}
                                minSize={config.minSize as any}
                                maxSize={200}
                                closeOnOutsideClick={true}
                            >
                                <div id={'content'}>
                                    <Outlet/>
                                </div>
                            </Drawer>
                        </LoadingProvider>
                    </LayoutContainer>
                )}
        </>
    )
};

export default memo(LayoutComponent);

export type propItem = {
    name:any,
    action?:()=>void,
    icon?:any,
    items?:Array<propItem>,
    active?:boolean,
}
