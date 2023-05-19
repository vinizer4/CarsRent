export const getGridItems = (gridRef:any) => {
    try {
        let items = (gridRef.current as any).instance.getDataSource().store()._array;
        if(items && items.length > 0)
            return items as Array<any>
        else
            return []
    }catch (e) {
        return []
    }
};
export const getGridSummaryByName = (gridRef:any,name:string) => {
    try {
        return (gridRef.current as any).instance.getTotalSummaryValue(name);
    }catch (e) {
        return undefined
    }
};