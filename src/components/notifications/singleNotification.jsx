import { ArrowBack, ArrowBackIos, ArrowLeft } from '@mui/icons-material';
import React from 'react';

function SingleNotification() {
    const currect_notification = JSON.parse(localStorage.getItem('current-notification'));
    return (
        <div>
             <center>
                <small className='faint'>inbox</small>
            </center>
            <br />
           
            <center>
                <h5>{currect_notification.subject}</h5>

                <div style={{ fontSize: '14px', padding: '0px 7px' }}>
                    {currect_notification.message}
                </div>
                <br />
                <button
                    className='btn btn-sm btn-custom'
                    onClick={()=> window.history.back()}
                ><ArrowBack />
                    Go Back
                </button>
            </center>


        </div>
    );
}

export default SingleNotification;