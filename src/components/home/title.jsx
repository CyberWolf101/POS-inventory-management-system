import { Home } from '@mui/icons-material';
import React from 'react';

function Title(props) {
    return (
        <div>
            <div className="text-success bg-white px-2 py-2 mt-2 mx-2 shadow-sm" style={{ alignItems: 'center', borderRadius: '4px' }}>
                <div className="flex">
                    <div className='btn-success btn btn-sm text-white straight' 
                    style={{fontSize:'17px', height:'29px'}}
                    > <Home fontSize='inherit' /></div>
                    &nbsp;
                    <small className='fw-bold'>Dashboard</small>
                </div>
            </div>
        </div>
    );
}

export default Title;