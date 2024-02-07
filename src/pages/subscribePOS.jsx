import React, { useState } from 'react';
import '../StyleSheets/pos.css';
import { Button, useToast } from '@chakra-ui/react';
import { AllPlans } from '../data';
import { Switch } from '@chakra-ui/react';
import { Fade } from 'react-reveal'
import useAuth from '../hooks/auth';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { UsePayPOS } from '../hooks/usePayment'
import { UseisAuthenticated } from '../hooks/useProtectPage';
import { useEffect } from 'react';
import { priceContext } from '../contexts/priceContext';
import { useContext } from 'react';
import PaymentModal from '../components/other/paymentModal';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { UseMakePosAdmin } from '../hooks/UsePosAdmin';
import RenewModal from '../components/other/RenewModal';
import Typewriter from 'typewriter-effect';
import { db } from '../config';
import { doc, getDoc } from 'firebase/firestore';


function SubscribePOS() {
    const [price, setPrice] = useContext(priceContext)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [clickedItem, setClickedItem] = useState()
    const [timeFrame, setTimeFrame] = useState('1 year')
    const { user, loadingUser } = useAuth()
    const [isQuarterly, setIsQuarterly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
    const [isSemi, setIsSemi] = useState(false);
    const [isYearly, setIsYearly] = useState(true);
    const [months, setmonths] = useState(12);
    const toast = useToast()
    const nav = useNavigate()
    const { handleFlutterPayment } = UsePayPOS(price)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const renewModal = useDisclosure();
    const { loading } = UseMakePosAdmin()
    const { type, currentPlan } = useParams()
    const settingsID = 'XA5eUSx0KyLCndY3TiDl';
    const [allSettings, setAllSettings] = useState({})
    const [pending, setPending] = useState(false)
    UseisAuthenticated()

    useEffect(() => {
        const getSettings = async () => {
            setPending(true)
            const docRef = doc(db, 'settings', settingsID);
            const data = await getDoc(docRef)
            console.log(data.data())
            setAllSettings(data.data())
            setPending(false)
        }
        getSettings()
    }, [])


    const handleMonthlyChange = () => {
        setIsQuarterly(false);
        setIsSemi(false);
        setIsYearly(false);
        setIsMonthly(true)
        setmonths(1)
        setTimeFrame('1 month')

    };


    const handleQuarterlyChange = () => {
        setIsQuarterly(true);
        setIsSemi(false);
        setIsYearly(false);
        setIsMonthly(false)
        setmonths(3)
        setTimeFrame('3 months')

    };

    const handleSemiChange = () => {
        setIsQuarterly(false);
        setIsSemi(true);
        setIsYearly(false);
        setIsMonthly(false)
        setmonths(6)
        setTimeFrame('6 months')

    };

    const handleYearlyChange = () => {
        setIsQuarterly(false);
        setIsSemi(false);
        setIsYearly(true);
        setIsMonthly(false)
        setmonths(12)
        setTimeFrame('1 year')
    };

    // if (loading || loadingUser || pending) return <LoadingPage />

    const availablePlans = AllPlans.filter(plan => plan.plan !== currentPlan && plan?.amountPerMonth > allSettings?.allPlans?.find(p => p.plan === currentPlan)?.amountPerMonth);
    // const availablePlans = allSettings?.allPlans?.filter(plan => plan.plan !== currentPlan && 900000 > allSettings?.allPlans?.find(p => p.plan === 900000));

    if (type === 'upgrade' && availablePlans?.length < 1) {
        return (
            <div className="small faint text-center mt-5">
                There are currently no plans to upgrade to
                <br />
                <br />
                <br />
                <button
                    onClick={() => nav(-1)}
                    className='btn btn-outline-success'
                >
                    Back

                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="responsive_brief">
                {/* {currentPlan} */}
                <div className="px-4 pt-2">
                    <div className='light py-3 text-white rounded' style={{ background: '#2F855A' }} >
                        <center>
                            <div className="text-uppercase">
                                {
                                    type !== 'upgrade' && type !== 'renew' && <b>SUBSCRIBE</b>
                                }
                                {
                                    type === 'upgrade' && <b>{type}</b>
                                }
                                {
                                    type === 'renew' && <b>{type}</b>
                                }
                            </div>

                            <small className="tiny">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .typeString('Optimize your inventory effortlessly!')
                                            .pauseFor(3500)
                                            .deleteAll()
                                            .typeString('Elevate your inventory with our tailored plans!')
                                            .start();
                                    }}
                                />
                            </small>
                        </center>
                    </div>
                </div>
            </div>
            <br />
            <div className="flex_normal shadow-sm py-2 adjust">
                <div className="flex-column tiny">
                    Monthly
                    <Switch size="md" isChecked={isMonthly} onChange={handleMonthlyChange} colorScheme='green' />
                </div>
                <div className="flex-column tiny">
                    Quaterly
                    <Switch size="md" isChecked={isQuarterly} onChange={handleQuarterlyChange} colorScheme='green' />
                </div>
                <div className="flex-column tiny">
                    Semi
                    <Switch size="md" isChecked={isSemi} onChange={handleSemiChange} colorScheme='green' />
                </div>
                <div className="flex-column tiny">
                    Yearly
                    <Switch size="md" isChecked={isYearly} onChange={handleYearlyChange} colorScheme='green' />
                </div>
            </div>
            <br />
            <div style={{ height: '100vh', overflowY: 'scroll' }}>
                <div className="plans_con">

                    {
                        type === 'upgrade' && availablePlans ?
                            availablePlans.map((item, index) => (
                                <div key={index} className="plan shaow2" style={{ background: item.color, letterSpacing: '1px' }}>
                                    <Fade>
                                        <div className="text-center">
                                            <h5 style={{ fontSize: '17px' }}>{item.plan}</h5>
                                            <div className="mb-2">
                                                <small className="tiny">
                                                    {type === 'renew' && user.pos_plan === item.plan && ('(currnt plan)')}
                                                    {type === 'upgrade' && user.pos_plan === item.plan && ('(currnt plan)')}
                                                </small>
                                            </div>
                                            <div className="small mb-3">
                                                {isYearly ? '12 months' : isQuarterly ? '3 months' : isMonthly ? '1 month' : '6 months'}
                                            </div>
                                        </div>
                                        <div className="plan_content mt-2">
                                            <small className="flex-column mt-2" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                                                <span>Number of stores: <b>{item.stores}</b></span>
                                                <span className="mt-2">Per month: <b> ₦ {item?.amountPerMonth?.toLocaleString()}</b></span>
                                                <span className="mt-2 mb-2">Total Amount: <b> ₦ {(item?.amountPerMonth * months)?.toLocaleString()}</b></span>
                                            </small>
                                        </div>
                                    </Fade>
                                    {type === 'renew' || type === 'upgrade' ?

                                        (
                                            <button
                                                className="btn fw-bold"
                                                style={{
                                                    background: 'white',
                                                    color: item.color,
                                                    width: '100%',
                                                    marginBottom: '5px',
                                                    marginTop: '15px',
                                                }}
                                                onClick={() => { renewModal.onOpen(); setClickedItem(item); console.log(timeFrame) }}
                                            >
                                                PURCHASE
                                            </button>
                                        ) :
                                        (
                                            <button
                                                className="btn fw-bold"
                                                style={{
                                                    background: 'white',
                                                    color: item.color,
                                                    width: '100%',
                                                    marginBottom: '5px',
                                                    marginTop: '15px',
                                                }}
                                                onClick={() => { onOpen(); setClickedItem(item); console.log(timeFrame) }}
                                            >
                                                PURCHASE
                                            </button>
                                        )
                                    }

                                </div>
                            ))

                            :
                            allSettings?.allPlans?.map((item, index) => (
                                <div key={index} className="plan shaow2" style={{ background: item.color, letterSpacing: '1px' }}>
                                    <Fade>
                                        <div className="text-center">
                                            <h5 style={{ fontSize: '17px' }}>{item.plan}</h5>
                                            <div className="mb-2">
                                                <small className="tiny">
                                                    {type === 'renew' && user.pos_plan === item.plan && ('(currnt plan)')}
                                                    {type === 'upgrade' && user.pos_plan === item.plan && ('(currnt plan)')}
                                                </small>
                                            </div>
                                            <div className="small mb-3">
                                                {isYearly ? '12 months' : isQuarterly ? '3 months' : isMonthly ? '1 month' : '6 months'}
                                            </div>
                                        </div>
                                        <div className="plan_content mt-2">
                                            <small className="flex-column mt-2" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                                                <span>Number of stores: <b>{item.stores}</b></span>
                                                <span className="mt-2">Per month: <b> ₦ {item?.amountPerMonth?.toLocaleString()}</b></span>
                                                <span className="mt-2 mb-2">Total Amount: <b> ₦ {(item?.amountPerMonth * months)?.toLocaleString()}</b></span>
                                            </small>
                                        </div>
                                    </Fade>
                                    {type === 'renew' || type === 'upgrade' ?

                                        (
                                            <button
                                                className="btn fw-bold"
                                                style={{
                                                    background: 'white',
                                                    color: item.color,
                                                    width: '100%',
                                                    marginBottom: '5px',
                                                    marginTop: '15px',
                                                }}
                                                onClick={() => { renewModal.onOpen(); setClickedItem(item); console.log(timeFrame) }}
                                            >
                                                PURCHASE
                                            </button>
                                        ) :
                                        (
                                            <button
                                                className="btn fw-bold"
                                                style={{
                                                    background: 'white',
                                                    color: item.color,
                                                    width: '100%',
                                                    marginBottom: '5px',
                                                    marginTop: '15px',
                                                }}
                                                onClick={() => { onOpen(); setClickedItem(item); console.log(timeFrame) }}
                                            >
                                                PURCHASE
                                            </button>
                                        )
                                    }

                                </div>
                            ))}
                </div>

                <div>


                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <PaymentModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} clickedItem={clickedItem} months={months} timeFrame={timeFrame} />
            <RenewModal isOpen={renewModal.isOpen} onClose={renewModal.onClose} onOpen={renewModal.onOpen} clickedItem={clickedItem} months={months} timeFrame={timeFrame} type={type} />
            <br />
        </div>
    );
}

export default SubscribePOS;
