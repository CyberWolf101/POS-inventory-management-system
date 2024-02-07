import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BounceBack() {
    const navigate = useNavigate()
    useEffect(() => {
        window.history.back()
        // navigate('/enc/configure'); 
        // navigate(-1); 
    }, [])
    return (
        <div>
            loading..
        </div>
    );
}

export default BounceBack;