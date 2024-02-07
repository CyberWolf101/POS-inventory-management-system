import React, { useEffect, useState } from 'react';
import { UseSignup } from '../../hooks/useSignup';
import { Password } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config';
import useAuth from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';
import { UseLogin } from '../../hooks/useLogin';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading } = UseLogin()
    // const { user, isLoading: authLoading } = useAuth()
    const [authUser, error] = useAuthState(auth);
    const nav = useNavigate()
    let redirectTo = '/'
    const hadleLogin = async (email, password) => {
        const success = await login(email,
            password,
            redirectTo
        )
    }
    return (
        <div>
            <div className='login_page'>
                <Fade>
                    <div >

                        <input type="email" className=' mt-3 form-control ' placeholder='email' autoComplete="false"
                            value={email} onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input type="password" className=' mt-3 form-control ' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
                        <br />

                        {
                            !isLoading && (
                                <button className="button btn btn-custom mt-3" onClick={() => hadleLogin(email, password)}>
                                    LOGIN
                                </button>
                            )
                        }
                        {
                            isLoading && (
                                <div className="button mt-3">
                                    <Spinner
                                        thickness='3px'
                                        color='green.500'
                                        emptyColor='gray.200'
                                    />
                                </div>
                            )
                        }
                    </div>
                    <br />
                    <Link to='/retrieve_password'>
                        <small>Forgot password?</small>
                    </Link>
                </Fade>
            </div>

        </div>
    );
}

export default Login;