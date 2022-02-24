# AdeAI NFT Marketplace

Trade digital assets and make well informed NFT Purchases in the crazy world on Digital Crypto Assets with the help of AI.

<!---Add Image here --->

![image](https://raw.githubusercontent.com/Bayurzx/adeai/master/screenshots/5_Virtual_3D.gif)
![image](https://raw.githubusercontent.com/Bayurzx/adeai/master/screenshots/6_AI_Test.gif)

## Why I Did It (Inspiration) ???

`Because blockchain is awesome!!!`
One of the issues plaguing the NFT ecosystem are counterfeiters or scam artists tricking unsuspecting users to buy popular NFTs as their own. Copy cats try to bypass Copyright laws by creating very similar crypto arts of popular NFTs.

## What It Does???

- With the help of AI the platform gives buyers first hand info of their purchase in a creative nifty way. It can also point them to the original
- Allows you to make auctions or set a fixed price for your NFTs
- Since the world is going virtual, we also created a platform that also allows you to add 3D representation of you NFTs. Check the walkthrough [walkthrough](https://adeai-walkthrough.netlify.app) on how to add 3D images

## Getting started:

- First, check out the site [AdeAI NFT Marketplace](https://adeai.netlify.app/)
- Make sure you have a web wallet, preferably MetaMask.
- If you haven’t added the Aurora Network yet, don’t worry the app will do that for you.
- Make sure that you are on the testnet
- Go to the faucet to get some test coins
- Trade NFTs and play around with the AI.

## Check the 👉🏼 [walk-through](https://adeai-walkthrough.netlify.app/) 👈🏼 for a more comprehensive documentation

How we built it
![image](https://raw.githubusercontent.com/Bayurzx/adeai/master/screenshots/architecture.png)

- The app was built with the help of the ReactJS Library and currently on top of the Aurora Testnet Network. DO NOT USE THE APP ON THE MAINNET.
- Users create a collection to house their NFTs. After creating a collection, you can then create your NFTs and then list them to be seen on the Marketplace. You need to setApprovalFor all before you can mint your token.
- Make sure to choose between having a fixed price NFT or an auctionable NFT
- You can choose to add a 3D version of your NFT make sure to check the walk-through to see how to add
- At the NFT detail page where you can buy NFTs, you can, with the help of AI get insights on your purchase. If it has a 3D content you will also find it here.

### Here is a list of some of the verified images the AI will det

- Bored Ape Kennel Club
- Bored Ape Yatch Club
- CLONE X - X TAKASHI MURAKA
- Cool Cats NFT
- Cool Pets NFT
- CryptoPunks
- CyberKongz
- Decentraland
- Doodles
- Gooniez Gang Official
- mfers
- Mutant Ape Yacht Club

> So Feel free to use the any of these and check the AI response (_Surprise, surprise😉_)

## Deploy smart-contract Steps

After forking the repo, remember to run the following line on powershell to deploy to aurora and link the smart contract to the frontend.

- npx hardhat run scripts/deploy.js --network testnet_aurora
- copy-item -path ".\artifact\*" -destination ".\src\artifact\" -recurse -Force

# Check out the app: [AdeAI NFT Marketplace](https://adeai.netlify.app/)

<article class="documentation_body doc-section" id="source_credit">
<div class="shortcode_title">
    <h2 class="load-order-2" id="source_title">
    Credits / Resources
    </h2>
</div>
<div class="row changelog_info" id="v100">
    <div class="col-lg-8">
    <div class="changelog_content">
        <ol>
        <li><a href="https://doc.aurora.dev/" target="_blank" class="text-warning">Aurora</a></li>
        <li><a href="https://near.org/" target="_blank" class="text-warning">Near Protocol</a></li>
        <li><a href="https://portal.azure.com/" target="_blank" class="text-warning">Azure</a></li>
        <li><a href="http://sketchfab.com/" target="_blank" class="text-warning">Sketchfab</a></li>
        <li><a href="https://reactjs.org/" target="_blank" class="text-warning">ReactJS</a></li>
        <li><a href="https://openzeppelin.com/" target="_blank" class="text-warning">OpenZeppelin</a></li>
        <li><a href="https://ethereum.org/" target="_blank" class="text-warning">Ethereum</a></li>
        <li><a href="https://docs.ethers.io" target="_blank" class="text-warning">EtherJS</a></li>
        <li><a href="https://github.com/ethereum-boilerplate/ethereum-boilerplate" target="_blank" class="text-warning">Ethereum Boilerplate</a></li>
        <li><a href="https://github.com/Vikings-Tech/reef-nft-marketplace" target="_blank" class="text-warning">Reef Marketplace</a></li>
        <li><a href="https://ant.design" target="_blank" class="text-warning">Ant Design</a></li>
        <li><a href="https://react-bootstrap.github.io" target="_blank" class="text-warning">React Bootstrap</a></li>
        <li><a href="https://themeforest.net/user/themetum" target="_blank" class="text-warning">Themetum</a></li>
        <li><a href="https://www.freepik.com/" target="_blank" class="text-warning">Freepik</a></li>
        <li><a href="https://www.pexels.com//" target="_blank" class="text-warning">Pexels</a></li>
        </ol>
    </div>
    </div>
</div>
<!-- End .row -->
</article>
