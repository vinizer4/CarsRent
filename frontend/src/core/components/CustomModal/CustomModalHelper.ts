export const closeModal = (ref:any) => {
    ref.current.instance.hide();
}
export const openModal = (ref:any) => {
    ref.current.instance.repaint();
    ref.current.instance.show();
}