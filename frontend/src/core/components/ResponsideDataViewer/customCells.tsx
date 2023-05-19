import { useState } from 'react';
import { colorDelete, colorFont, colorHeavyGray, colorPrimary, colorSave, colorSoftBlack, loadImg } from '../../consts';
import { AiOutlineLine, BsCheck2Circle, BsXCircle } from "react-icons/all";
import { Button } from "devextreme-react";
import { renderToString } from "react-dom/server";

export const imageCell = (value: string) => (<img style={{ width: '40px' }} src={loadImg(value)} alt={''} />)
export function boolCell(el: any, info: any) {
    el.innerHTML = "<div>" + renderToString(info.value ? <BsCheck2Circle size={20} style={{ color: colorSave }} /> :
        <BsXCircle size={20} style={{ color: colorDelete }} />) + "</div>"
}
export function boolCellSN(el: any, info: any) {
    el.innerHTML = "<div>" + renderToString(info.value === 'Sim' ? <BsCheck2Circle size={20} style={{ color: colorSave }} /> :
        <BsXCircle size={20} style={{ color: colorDelete }} />) + "</div>"
}


export const showImageCell = (value: string) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            {value && (
                <>
                    <Button onClick={handleOpen}>Visualizar</Button>
                    {/*<Modal*/}
                    {/*    open={open}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    aria-labelledby="modal-modal-title"*/}
                    {/*    aria-describedby="modal-modal-description"*/}
                    {/*>*/}
                    {/*    <Box sx={style} display="flex" justifyContent="center" alignItems="center">*/}
                    {/*        <img src={value}/>*/}
                    {/*    </Box>*/}
                    {/*</Modal>*/}
                </>
            )}
        </>
    )
}

export const renderSubRow = (text: any, row: any, key: string) =>
(
    !row['children'] && row[key] ?
        (<div style={{ display: 'flex', gap: '10px' }}>
            <AiOutlineLine style={{ color: colorPrimary }} />
            <span>
                {text}
            </span>
        </div>) :
        <span>
            {text}
        </span>
)

// export const ShowProducts = (
//     children?: JSX.Element,
//     guid_venda?: any
// ) => {
//     const [items, setItems] = useState<Array<any>>();
//     const [loading, setLoading] = useState(false);
//
//     async function handleItems() {
//         setLoading(true);
//         if (!items && guid_venda) {
//             const res = await SallesService.GetSaleItems(guid_venda);
//             if (res && isSucess(res.status)) {
//                 setItems(res.data)
//             }
//         }
//         setLoading(false)
//     }
//
//     const itemTile = (item: any) => (
//         <a target="_blank" href={`/product/product/new/${item.guid_produto}`}>
//             <div
//                 style={{
//                     display: "flex",
//                     alignItems: 'center',
//                     gap: '10px',
//                     maxWidth: '98vw',
//                     flexWrap: 'wrap',
//                 }}
//             >
//                 <img style={{width: 50}} src={loadImg(item.thumb_url)} alt={item.descricao}/>
//                 <div style={{width: 300}}>
//                     <b> Descrição: </b> {item.descricao} </div>
//                 <div style={{width: 150}}>
//                     <b>Preço: </b>{formatCurrency(item.preco)}</div>
//                 <div style={{width: 100}}>
//                     <b>Quantidade: </b>{Number(item.quantidade)}</div>
//             </div>
//         </a>
//     )
//     const skelletonTile = () => (
//         <a target="_blank">
//             <div
//                 style={{
//                     display: "flex",
//                     alignItems: 'center',
//                     gap: '10px',
//                     maxWidth: '98vw',
//                     flexWrap: 'wrap',
//                     backgroundColor: `${colorSecondary}`,
//                     padding: '5px'
//                 }}
//             >
//                 <Skeleton.Image style={{
//                     width: '70px',
//                     height: '70px'
//                 }}/>
//                 <Skeleton.Input size={'large'} active/>
//                 <Skeleton.Input size={'large'} active/>
//                 <Skeleton.Input size={'large'} active/>
//             </div>
//         </a>
//     )
//
//     const dropdownContent = () => {
//         if (loading) {
//             return (skelletonTile)
//         } else {
//             if (items && items.length > 0) {
//                 return (
//                     <Menu items={
//                         items?.map((i) => {
//                             return {
//                                 label: itemTile(i),
//                                 key: i.guid_vendasitem
//                             }
//                         })
//                     }/>
//                 )
//             } else {
//                 return (<a target="_blank">
//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: 'center',
//                             width: '300px',
//                             flexWrap: 'wrap',
//                             backgroundColor: `${colorSecondary}`,
//                             padding: '30px',
//                             border: '0.5px gray solid'
//                         }}
//                     >
//                         Nenhum item no pedido :(
//                     </div>
//                 </a>)
//             }
//         }
//     }
//
//     return (
//         <>
//             <Dropdown
//
//                 trigger={['click']}
//                 overlay={dropdownContent()}>
//                 <a onClick={e => {
//                     e.preventDefault()
//                     handleItems()
//                 }}>
//                     <Tag
//                         style={{display: 'flex', alignItems: 'center'}}
//                         icon={<DropboxOutlined/>}
//                         color="purple">
//                         {children}
//                     </Tag>
//                 </a>
//             </Dropdown>
//         </>
//     )
// }