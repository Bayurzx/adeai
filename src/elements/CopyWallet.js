import React from 'react';

function CopyWallet() {
    return (
        <>
            <div className="copy-icon-otr">
                <span id="wallet" className="profile_wallet text heading-SB">DdzFFzCqrhshMSxb9oW1HPa7K7f865Kk4LqnrME</span>
                <button id="btn_copy" title="Copy Text">
                    <i className="bx bx-copy-alt" />
                </button>
            </div>
        </>
    );
}

export default CopyWallet;


// let wallet = document.getElementById("wallet").outerText;


/* Copy the text inside the text field */
// navigator.clipboard.writeText(wallet);