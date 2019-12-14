import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

import { setUser } from '../../redux/userActions';
import { getItem } from '../../services/database';

import FormInput from '../../components/FormInput';
import Brand from '../../components/Brand';

import './Welcome.scss';
import { login } from '../../services/auth';

const Welcome = ({history}) => {

    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState('');
    const [displayLogo, setDisplayLogo] = useState('');
    const dispatch = useDispatch();

    useEffect( () =>{
        setDisplayLogo("display");
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const { email, password } = formData;

        if(!email || !password){
            setError("All fields are required");
        } else{
            const result = await login(email, password);
            if(result){
                const initialProfile = await getItem('profiles', result);
                if(initialProfile){
                    dispatch(setUser(initialProfile));
                    history.push('/Home');
                }
            }
        }
    }

    return(
        <div className="welcome">
            <Brand displayLogo={displayLogo}/>
            {error && <div className='error'>{error}</div>}
            <form onSubmit={handleSubmit}>
                <FormInput 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={value => setFormData({ ...formData, email: value })}
                />
                <FormInput 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={value => setFormData({ ...formData, password: value })}
                />
                <button type="submit">Login</button>
                <Link to={'/CreateAccount'} className="signUpLink">Or Sign Up</Link>
            </form>
        </div>
    )
}

export default Welcome;