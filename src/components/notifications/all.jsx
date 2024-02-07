import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/auth';
import { Spinner } from '@chakra-ui/react';
import { useAddNotification } from '../../hooks/useNotification';

function All({ notifications }) {
    // trying to compare to to change opacity
    const { user, isLoading: userLoading } = useAuth()
    const { handleItemClick, loading } = useAddNotification()

    useEffect(() => {
        // console.log('personal ',refinedData.personalNotifications)
        console.log('hbh ', user.personalNotifications)
    }, [])

    const personal = user.personalNotifications

    if (userLoading || loading || personal == undefined) return <center><Spinner /></center>

    const mergedArray = [...notifications, ...personal]//notifications.concat(user.personalNotifications);
    const filteredNotifications = mergedArray
        ?.filter(notification => user.date < notification.date)
        .slice()
        .sort((a, b) => b.date - a.date);

    return (
        <div className='mx-2 responsive_notification'>
            <center>
                <small className='faint'>All notifications</small>
            </center>

            {
                filteredNotifications
                    .map((notification, index) => (
                        <div key={index} className={
                            user.notifications?.map((li) => li.subject).includes(notification?.subject) ?
                                'shadow2 my-3 py-2 px-2 rounded notified ' : 'shadow2 my-3 py-2 px-2 rounded'
                        } onClick={() => handleItemClick(notification)}>
                            <div className="flex_normal">
                                <small className='fw-bold'>{notification.subject}</small>
                                <small className='faint' style={{ fontSize: '10px' }}>{formatDistanceToNow(new Date(notification.date))} ago</small>
                            </div>
                            <div>
                                <small>
                                    {notification.message && notification.message.length > 44
                                        ? notification.message.slice(0, 45) + '...'
                                        : notification.message}
                                </small>
                            </div>
                        </div>
                    ))
            }

            {filteredNotifications.length < 1 || !filteredNotifications && <div className='faint'>No notifcations yet</div>}
        </div>
    );
}

export default All;
