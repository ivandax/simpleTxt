import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import './Form.scss'

const Form = ({setPost}) => {
    
    const profile = useSelector(state=>state.user);

    const [input, setInput] = useState('');
    const [inputLength, setInputLength] = useState(0);
    const [textHeight, setTextHeight] = useState(50);

    const handleTextChange = (event) => {
        const {value,scrollHeight} = event.target; //gets value and scroll height.
        const intros = value.split("\n").length;//counts how many times the user has hit enter.
        setInput(value);//set value in the text area and the word count.
        setInputLength(value.length);
        if(scrollHeight>50 && intros>2){//rules to resize the text area dynamically.
            setTextHeight(intros*20+20);
        }
        else if(scrollHeight>50){
            setTextHeight(scrollHeight);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(input){
            const postData = { 
                profileId: profile.id,
                content : input,
                timestamp : +(new Date()),
                replies : [],
                likedBy : []
            }
            setPost(postData)
            setInput('');
            setInputLength(0);
        }        
    }

    return (
        <form className="input_form" onSubmit={handleSubmit}>
            <textarea name="input" value={input} maxLength="150" placeholder="Enter post here" onChange={handleTextChange} style={{height:textHeight}}></textarea>
            <div className="input_length">{inputLength}</div>
            <button type="submit">Post</button>
        </form>
    )
}

export default Form;


