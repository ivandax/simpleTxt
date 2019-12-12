import React from 'react';

const FormInput = ({value,onChange,type="text",placeholder, maxLength='20'}) => {
    return(
        <input 
            placeholder={placeholder} 
            type={type} 
            value={value} 
            maxLength={maxLength}
            onChange={event=>onChange(event.target.value)} 
        />
    )
}

export default FormInput;