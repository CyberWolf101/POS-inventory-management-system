import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { userContext } from '../contexts/userContext';
import { InventoryDataContext } from '../contexts/inventoryDataContext';

export function UseLogin() {

    const navigate = useNavigate()
    const toast = useToast()        //used for alerts
    const [isLoading, setLoading] = useState(false);
    const [userDetails, setuserDetails] = useContext(userContext)
    const [inventoryData, setInventoryData] = useContext(InventoryDataContext)
    async function login(email, password, redirectTo = '/') {

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
        if (!password) {
            toast({
                title: "Please enter a valid password!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle',

            });
            return;
        }


        try {
            setLoading(true);
            const data = await signInWithEmailAndPassword(auth, email, password)

            const rawData = await getDoc(doc(db, 'users', data.user.uid))
            const user = rawData.data()
            setuserDetails(user)
            const invData = await getDoc(doc(db, 'inventory_data', user.inventoryID))
            if (invData) {
                const main = invData.data()
                setInventoryData(main)
            }
            toast({
                title: "You are logged in!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle',

            });
            navigate('/profile/pos-admin/' + data.user.uid)

        } catch (error) {
            console.log('code', error.code)
            const errorCode = error.code
            if (errorCode === 'auth/user-not-found') {
                // The provided email doesn't exist in the Firebase system.
                toast({
                    title: "Error",
                    description: "Email not found!",
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                    variant: 'subtle'
                });
            }
            else if (errorCode === 'auth/wrong-password') {
                toast({
                    title: "Error",
                    description: "Incorrect password!",
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                    variant: 'subtle'
                });
            }
            else if (errorCode === 'auth/invalid-email') {
                toast({
                    title: "Error",
                    description: "Invalid email!",
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                    variant: 'subtle'
                });

            } else {
                toast({
                    title: "Login Failed",
                    description: "Please check that you are connected to the internet!",
                    status: 'error',
                    isClosable: true,
                    position: "top",
                    duration: 3000,
                    variant: 'subtle'

                })
            }

            setLoading(false);
            return false;
        }

        setLoading(false);
        return true;
    }


    return { login, isLoading };

}

