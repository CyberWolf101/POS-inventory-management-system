import React from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import useAuth from '../hooks/auth';
import { auth } from '../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/logout';
import LoadingPage from '../components/partials/Loading';
import { userContext } from '../contexts/userContext';
import { useContext } from 'react';
import LoadingService from '../components/partials/loadingService';
import { ArrowLeftSharp } from '@mui/icons-material';

function ContinueWithAccount() {
    const [authUser, isLoading, error] = useAuthState(auth);
    const { user, loadingUser } = useAuth()
    const nav = useNavigate()
    const { logout, isLoading: loadingLogout } = useLogout();
    const [userDetails, setuserDetails] = useContext(userContext)

    // Function to ask a yes/no question using SweetAlert
    // const askConfirmation = () => {
    //     swal({
    //         title: 'Do you want to proceed with your current account?',
    //         icon: 'info',
    //         buttons: {
    //             cancel: 'No',
    //             confirm: 'Yes',
    //         },
    //     }).then((result) => {
    //         if (result) {
    //             handleYes();  // Function to execute on "Yes" button click
    //         } else {
    //             handleNo();   // Function to execute on "No" button click
    //         }
    //     });
    // };

    // // Functions to execute based on user's choice


    const handleYes = () => {
        if (!user.id) {
            nav('/auth')
            console.log('user', user)
            console.log('authUser', authUser)
            swal('You are not currently logged into any account')
        } else {
            console.log(user)
            console.log('user', user)
            console.log('authUser', authUser)
            nav('/profile/pos-admin/' + user.id)
        }
    };

    const handleNo = () => {
        console.log('logout');
        logout()
    };

    // Call the function to ask the question on page load
    useEffect(() => {
        if (!isLoading && !authUser) {
            nav('/auth')
        }
    }, [isLoading]);

    const handle = () => {
        console.log(user)
        console.log('user', user)
        nav('/profile/pos-admin/' + user.id)
    }

    if (loadingUser || isLoading) return <LoadingService />
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', padding: '0px 20px' }}>


            <div style={{ letterSpacing: '1px', fontSize: '21px' }} className='fw-bold text-success'>
                <center>
                    Continue with previously logged in account?
                </center>
            </div>
            <div className="mt-4 flex">

                <button
                    className='btn btn-outline-success mx-3'
                    onClick={handleNo}
                    style={{ width: '65px' }}
                >
                    NO
                </button>

                <button
                    className='btn btn-success mx-3'
                    onClick={handleYes}
                    style={{ width: '65px' }}
                >
                    YES
                </button>
            </div>

            <div className="mt-5 flex small">
                <center>
                    <a href="https://decoy-online-vite-shop.netlify.app"
                        className='text-success text-decoration-underline'
                        target='_blank'

                    >
                        Back home
                    </a>

                    {/* <a href="https://decoy-online-vite-shop.netlify.app"
                        className=' text-decoration-underline btn btn-success'
                        target='_blank'

                    >
                        <Home/>
                    </a> */}
                </center>
            </div>
        </div>
    );
}

export default ContinueWithAccount;