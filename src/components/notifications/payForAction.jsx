import { Receipt, SellOutlined } from '@mui/icons-material';
import React from 'react';
import useAuth from '../../hooks/auth';
import { Link } from 'react-router-dom';

function PayForAction(props) {
    const { user } = useAuth()
    return (
        <div>
            {
                user.canPayforBid && (
                    <div className="pay-up">
                        <Link to={'/payment/bids/'+ user.bidID }>
                            <div className=''>
                                <SellOutlined />
                            </div>
                        </Link>
                    </div>
                )
            }

        </div>
    );
}

export default PayForAction;