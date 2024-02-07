import { Cloud, ExpandMoreOutlined } from '@mui/icons-material';
import React from 'react';

function OtherAdminDetails(props) {
    return (
        <div className='pos-details-con mt-3'>
            <div className='pos-admin-card box-shadow mx-2'>
                <div style={{ color: '#3182CE' }}>
                    <Cloud color='inherit' />
                </div>
                <div>
                    <small>GOLD</small>
                </div>
                <div>
                    <small className='tiny faint'>Plan</small>
                </div>

                <div className='mt-2 small btn-custom p-3'>
                    <small> Expires 11-20-2023</small>
                </div>
            </div>

            <div className='pos-admin-card box-shadow mx-2'>
                <div style={{ color: '#3182CE' }}>
                    <Cloud color='inherit' />
                </div>
                <div>
                    <small>GOLD</small>
                </div>
                <div>
                    <small className='tiny faint'>Plan</small>
                </div>

                <div className='mt-2 small btn-custom p-3'>
                    <small> Expires 11-20-2023</small>
                </div>
            </div>
        </div>
    );
}

export default OtherAdminDetails;