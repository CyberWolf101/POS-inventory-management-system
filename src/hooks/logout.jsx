import { useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';
import swal from 'sweetalert';
import { userContext } from '../contexts/userContext';

export function useLogout() {
    const nav = useNavigate()
    const toast = useToast()        //used for alerts
    const [userDetails, setuserDetails] = useContext(userContext)

    const [signout, isLoading, error] = useSignOut(auth);  //implementing react-firebase-hooks for logout

    async function logout() {
        swal({
            title: "Are you sure?",
            text: "Sign out from current account",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                async function execute() {
                    if (await signout()) {
                        toast({
                            title: "You are logged out",
                            status: "info",
                            isClosable: true,
                            position: "top",
                            duration: 5000,
                            variant: 'subtle',
                            colorScheme: 'green'

                        })
                        setuserDetails({})
                        nav('/auth')

                    } else {

                    }
                }
                execute()
            }
        })

    }
    return { logout, isLoading, error };

}

