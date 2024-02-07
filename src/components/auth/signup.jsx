import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import { Checkbox, Spinner, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { setRef } from '@material-ui/core';
import { auth } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UseSignup } from '../../hooks/useSignup';


function Signup(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState('')
    const [surename, setSurename] = useState('')
    const { signup, isLoading } = UseSignup()
    const nav = useNavigate()
    const toast = useToast()

    const handleSignup = async (email, password, name, phone, surename) => {
        if (email.length < 8) {
            toast({
                title: "Please enter a valid email address!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle',

            });
            return;
        }
    
        if (!name) {
            toast({
                title: "Error",
                description: "you must provide a name",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (!surename) {
            toast({
                title: "Error",
                description: "you must provide your surname",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (phone.length != 11) {
            toast({
                title: "Invalid phone number",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (password.length < 6) {
            toast({
                title: "Invalid password",
                description: "password must contain atleast 6 characters",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;

        }

        if (password !== password2) {
            toast({
                title: "Passwords do not match!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'
            });
            return;
        }

        console.log(email, password, name, phone, surename)
        const success = await signup({
            email: email,
            password: password,
            name: name,
            phone: phone,
            surename: surename
        });
    }

    return (
        <div>
            <Fade>
                <div >
                    <input type="email" className=' mt-3 form-control ' placeholder='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='first name' required value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='surname' required value={surename} onChange={(e) => { setSurename(e.target.value) }} />
                    <input type="number" className=' mt-3 form-control ' placeholder='phone number' required value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <input type="password" className=' mt-3 form-control ' placeholder='password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" className=' mt-3 form-control ' placeholder='retype password' required value={password2} onChange={(e) => { setPassword2(e.target.value) }} />


                    {!isLoading && (
                        <button className="button btn btn-custom mt-3" onClick={() => handleSignup(email, password, name, phone, surename)}>
                            SIGN UP
                        </button>
                    )}
                    {isLoading && (
                        <div className="button mt-3" >
                            <Spinner
                                thickness='3px'
                                color='green.500'
                                emptyColor='gray.200'
                            />
                        </div>
                    )}

                </div>

            </Fade>
        </div>
    );
}

export default Signup;