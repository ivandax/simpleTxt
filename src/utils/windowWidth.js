
/* This might be useful in the future... */
useEffect( () => { //first call to define the device and set it to state.
const windowState = window.innerWidth < 764 ? 'side' : 'fixed';
setDevice(windowState);
}, []);

useEffect(() => { //this is continuously tracking the resize of the window.
const windowWidthListener = () => {
    const windowState = window.innerWidth < 764 ? 'side' : 'fixed';
    console.log("window state ",windowState)
    setDevice(windowState);
};
window.addEventListener('resize', windowWidthListener)

return () => {
    window.removeEventListener('resize', windowWidthListener);
}
}, []);