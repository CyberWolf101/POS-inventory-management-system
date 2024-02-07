import React, { useContext } from 'react';
import { useEffect } from 'react';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import { format } from 'date-fns';
import { Autorenew, Person, Upload } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../components/nav';
import { useSCrollToTop } from '../hooks/useSCroll';
import { InventoryDataContext } from '../contexts/inventoryDataContext';

function Plan(props) {
    const { id } = useParams()
    const { handleGetInventoryData, inventoryData, Loading } = UseGetInventoryData()
    // const [inventoryData] = useContext(InventoryDataContext)
    const nav = useNavigate()
    useSCrollToTop()
    useEffect(() => {
        handleGetInventoryData(id)
    }, [])
    useEffect(() => {
        if (!Loading && !inventoryData) {
            nav('/account/subscibe-POS')
        }
        console.log('inv', inventoryData)
    }, [inventoryData])


    // if (Loading) return <LoadingPage />

    return (
        <div>
            <Nav />
            {
                inventoryData && (
                    <div className='mx-2'>
                        <div className='flex_normal shadow-sm py-4'>
                            <button
                                className={
                                    inventoryData?.subscriptionDue > Date.now() ?
                                        'btn btn-custom btn-sm border-1 border-white border text-white'
                                        :
                                        'btn btn-custom btn-sm'
                                }
                                disabled={inventoryData?.subscriptionDue > Date.now()}
                                onClick={() => nav(`/account/subscibe-POS/renew/${inventoryData.plan}`)}
                                style={{ letterSpacing: '1px' }}
                            >
                                Renew plan
                                <Autorenew />
                            </button>
                            <button
                                className='btn btn-blue btn-sm'
                                onClick={() => nav(`/account/subscibe-POS/upgrade/${inventoryData.plan}`)}
                                style={{ letterSpacing: '1px' }}
                            >
                                Ugrade plan <Upload />
                            </button>
                        </div>
                        <br />
                        <div className="mx-3">
                            <div className='flex shadow2 py-3  subscription-card' style={{ flexDirection: 'column' }}>
                                <div className="flex text-success">
                                    <Person /> {inventoryData.ownerName}
                                </div>
                                <div className="designLine mt-1"></div>
                                <br />
                                <div className="text-uppercase text-success">
                                    PLAN :{inventoryData.plan}
                                </div>
                                <div className='active-status'>
                                    {inventoryData?.subscriptionDue > Date.now() ?
                                        < button className=' bg-success px-3 text-white'>
                                            <small className='tiny'>ACTIVE</small>
                                        </button>
                                        :
                                        <button className='bg-danger px-3 text-white'>
                                            <small className='tiny'>INACTIVE</small>
                                        </button>
                                    }
                                </div>
                                <br />
                                <div style={{ width: '90%' }}>
                                    <div className="bg-success w-100 text-white p-3 rounded">
                                        Time frame : <b>{inventoryData.subscriptionPeriod}</b>
                                        <br />
                                        <br />
                                        Time due: <b>{inventoryData?.subscriptionDue && format(new Date(inventoryData?.subscriptionDue), 'dd-MMMM-yyyy')}</b>
                                        <br />
                                        <br />
                                        Stores Allowed: <b>{inventoryData.allowedStores}</b>
                                        <br />
                                        <br />
                                        Total Stores: <b>{inventoryData.totalStores}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* {
                !inventoryData && (
                    <div>
                        <SubscribePOS/>
                    </div>
                )
            } */}
        </div >
    );
}

export default Plan;