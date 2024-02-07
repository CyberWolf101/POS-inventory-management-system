import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShopBounceBack(props) {
    const navigate = useNavigate()
    useEffect(() => {
        // window.history.back()
        navigate('/subscribed/subuser');
    }, [])
    return (
        <div>

        </div>
    );
}

export default ShopBounceBack;