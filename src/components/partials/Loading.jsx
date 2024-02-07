import { Spinner } from '@chakra-ui/react';
import React from 'react';

function LoadingPage(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div id="wifi-loader">
                <svg className="circle-outer" viewBox="0 0 86 86">
                    <circle className="back" cx="43" cy="43" r="40"></circle>
                    <circle className="front" cx="43" cy="43" r="40"></circle>
                    <circle className="new" cx="43" cy="43" r="40"></circle>
                </svg>
                <svg className="circle-middle" viewBox="0 0 60 60">
                    <circle className="back" cx="30" cy="30" r="27"></circle>
                    <circle className="front" cx="30" cy="30" r="27"></circle>
                </svg>
                <svg className="circle-inner" viewBox="0 0 34 34">
                    <circle className="back" cx="17" cy="17" r="14"></circle>
                    <circle className="front" cx="17" cy="17" r="14"></circle>
                </svg>
                <div className="text" data-text="Loading..."></div>
            </div>
            {/* <div className="socket">
                <div className="gel center-gel">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c1 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c2 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c3 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c4 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c5 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c6 r1">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>

                <div className="gel c7 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>

                <div className="gel c8 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c9 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c10 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c11 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c12 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c13 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c14 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c15 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c16 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c17 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c18 r2">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c19 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c20 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c21 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c22 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c23 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c24 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c25 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c26 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c28 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c29 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c30 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c31 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c32 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c33 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c34 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c35 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c36 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>
                <div className="gel c37 r3">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>

            </div> */}

        </div>
    );
}

export default LoadingPage;