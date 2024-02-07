import React from 'react';
import { useParams } from 'react-router-dom';

function BranchStatistics(props) {
    const { branchName } = useParams()
    return (
        <div>
            <br />
            <center>
                <small style={{letterSpacing:'1px'}}>{branchName} statistics</small>
            </center>
        </div>
    );
}

export default BranchStatistics;