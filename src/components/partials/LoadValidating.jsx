import { Spinner } from '@chakra-ui/react';
import React from 'react';

function LoadValidating(props) {
    return (
        <div>
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Spinner
                    thickness='5px'
                    color='green.500'
                    emptyColor='gray.200'
                    size='xl'
                />
                <small className='faint mt-2'> Validating details..</small>
            </div>
        </div>
    );
}

export default LoadValidating;