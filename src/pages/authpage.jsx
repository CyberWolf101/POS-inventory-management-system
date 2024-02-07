import React, { useEffect, useState } from 'react';
import { Fade, Slide } from 'react-reveal';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Spinner } from '@chakra-ui/react'
import Signup from '../components/auth/signup';

import Login from '../components/auth/login';
function Authpage() {
  
    return (
        <div>
            <div className='auth-page'>
                <div className="main-body login-contents">

                    <div className='login-details rounded'>
                        <div className='auth-container py-4 px-4 rounded shadow2'>
                            <center>
                                <Tabs position="relative" variant="unstyled">
                                    <TabList style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',color:'white' }}>
                                        <Tab className='tab text-white'>LOGIN</Tab>
                                        <Tab className='tab text-white'>SIGN UP</Tab>
                                    </TabList>
                                    <TabIndicator
                                        mt="-1.5px"
                                        height="2px"
                                        bg="white"
                                        borderRadius="1px"

                                        
                                    />
                                    <TabPanels>
                                        <TabPanel>
                                            <Fade>
                                              <Login/>
                                            </Fade>
                                        </TabPanel>
                                        <TabPanel>
                                            <Signup />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>

                            </center>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Authpage;