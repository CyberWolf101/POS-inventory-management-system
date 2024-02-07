import React, { useState } from 'react';
import { auth } from '../config';
import { sendPasswordResetEmail } from 'firebase/auth'
import swal from 'sweetalert';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Retrieve_password(props) {
    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false)
    const nav = useNavigate()

    const forgotpwd = () => {
        if (email.length < 8) {
            swal('Invalid Email', 'Please Enter a valid email address', 'error')
            return;
        }
        setloading(true)
        sendPasswordResetEmail(auth, email).then(() => {
            swal('Success', 'A link was sent to your specified email address', 'success')
            nav('/auth')
            setloading(false)
        }).catch((error) => {
            const code = error.code
            console.log(error.code)
            if (code === 'auth/network-request-failed') {
                swal('Error', 'Please check that you are connected to the internet', 'error')
            }
            if (code === 'auth/invalid-email') {
                swal('Error', 'Please check you entered a valid email', 'error')
            }
            setloading(false)

        });
    }
    return (
        <div className='' style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <div className='shadow px-3 py-5 border rounded'>
                <input type="text"
                    className='form-control'
                    placeholder='enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}

                />
                <Button
                    className='w-100 mt-3'
                    isLoading={loading}
                    colorScheme='green'
                    onClick={forgotpwd}
                >Submit</Button>
            </div>
        </div>
    );
}

export default Retrieve_password;