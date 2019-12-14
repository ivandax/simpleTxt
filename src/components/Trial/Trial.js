import React from 'react';

const Trial = ({data}) => {
    return (
        <div>
            <div>{data.title}</div>
            <p>{data.content}</p>            
        </div>
    )
}

export default Trial