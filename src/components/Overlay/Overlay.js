import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { hideProfileViewer } from '../../redux/userActions';

import './Overlay.scss';

const Overlay = () => {
    const displayMe = useSelector(state=>state.toggleProfileViewer.className);

    const dispatch = useDispatch();

    const handleOverlayClick = () => {
      dispatch(hideProfileViewer());
    }    

    return (
        <div className={`overlay ${displayMe}`} onClick={handleOverlayClick}>
        </div>
    )
}

export default Overlay;