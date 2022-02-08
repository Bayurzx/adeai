import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import Store from '../useContexts/Store'

function AccountConn() {
    const { account } = useContext(Store);
    return (
        <>
            <div className="action-nav">
                <Button variant="success">
                    <span id="wallet" className="profile_wallet text heading-SB"><strong>🔑 {account}</strong></span>
                </Button>
            </div>
        </>
    )
}

export default AccountConn;
