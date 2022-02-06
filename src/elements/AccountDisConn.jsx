import React, { useContext} from 'react';
import { Button } from 'react-bootstrap';

import Store from '../useContexts/Store'

function AccountConn() {
    const { setup } = useContext(Store);
    return (
        <>
            <div className="action-nav">
                <Button onClick={() => setup()} variant="warning">Connect Wallet 💰</Button>
            </div>
        </>
    )
}

export default AccountConn;
