import React from 'react';

const FormTextArea = ({value,onChange,placeholder}) => {
    return(
        <textarea 
            placeholder={placeholder}  
            value={value} 
            onChange={event=>onChange(event.target.value)} 
        ></textarea>
    )
}

export default FormTextArea;