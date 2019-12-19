import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { signup, registerAuthObserver } from '../../services/auth';

import { addItemWithId, getItem } from '../../services/database';
import { getDefaultPic } from '../../services/storage';

import FormInput from '../../components/FormInput';
import Brand from '../../components/Brand';

import './CreateAccount.scss';

let cancelObserver;

const CreateAccount = ({history}) => {

    const[formData, setFormData] = useState({name:'',email:'',password:''});
    const [error, setError] = useState('');

    const [displayLogo, setDisplayLogo] = useState('');
    useEffect( () =>{
        setDisplayLogo("display");
    }, []);

    useEffect(()=>{
        if(cancelObserver) cancelObserver();

        cancelObserver = registerAuthObserver(async(user)=>{
            if(user){
                console.log("user is", user);
                const profile = await getItem('profiles', user.uid);
                if(!profile){
                    const defaultPic = await getDefaultPic();
                    const result = await addItemWithId(
                        'profiles',
                        {
                            name: formData.name, 
                            email: formData.email,
                            bio: 'Your bio will display here, Edit Profile to modify it.',
                            following: [user.uid],
                            followers: [],
                            likes: 0,
                            posts:0,
                            pic: defaultPic,
                            id: user.uid
                        },
                        user.uid
                    );
                    if(result)
                        history.push('/');
                    }
                }
            })

        return () => {
            cancelObserver();
        }
    }, [formData.name, formData.email, history]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        
        const {name,email,password} = formData;
        console.log(name,email,password);

        if(!name || !email || !password){
            setError("All fields are required!");
        } else{
            signup(email, password)
        }
    }

    return(
        <div className="createAccount">
            <Brand displayLogo={displayLogo}/>
            {error && <div className='error'>{error}</div>}
            <div className="create">Create your account:</div>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={value => setFormData({ ...formData, name: value })}
                />
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
                <button type="submit">Create Account</button>
                <Link className="signUpLink" to={'/Welcome'}>Back</Link>
            </form>
        </div>
    )
}

export default CreateAccount;