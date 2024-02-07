import React from 'react';

function LoadingService(props) {
    return (
        <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div class="loader-container">
                <div class="loader">
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                    <div class="loader-inner"></div>
                </div>
               
            </div>
            <br />
                <div id="wifi-loader">
                    <div className="text text-capitalize" data-text="Initializing..." style={{fontSize:'16px', letterSpacing:'1px'}}></div>
                </div>
        </div>
    );
}

export default LoadingService;