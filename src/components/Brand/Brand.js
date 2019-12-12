import React from 'react';

import './Brand.scss';

const Brand = ({displayLogo}) => {
    return(
        <div className="brand">
            <span className={`${displayLogo} n12`}>{"<"}</span>
            <span className={`${displayLogo} n11`}>s</span>
            <span className={`${displayLogo} n10`}>i</span>
            <span className={`${displayLogo} n9`}>m</span>
            <span className={`${displayLogo} n8`}>p</span>
            <span className={`${displayLogo} n7`}>l</span>
            <span className={`${displayLogo} n6`}>e</span>
            <span className={`${displayLogo} n5`}>T</span>
            <span className={`${displayLogo} n4`}>x</span>
            <span className={`${displayLogo} n3`}>t</span>
            <span className={`${displayLogo} n2`}> /</span>
            <span className={`${displayLogo} n1`}>{">"}</span>
        </div> 
    )
}

export default Brand;
