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
- Since the world is going virtual, we also created a platform that also allows you to add 3D representation of you NFTs. Check the walkthrough [walkthrough](https://adeai-walkthrough.netlify.app)  on how to add 3D images

## Getting started:
- Check out the site here:
- Make sure you have a web wallet, preferably MetaMask.
- If you haven’t added the Aurora Network yet, don’t worry the app will do that for you.
- Make sure that you are on the testnet
- Go to the faucet to get some test coins
- Trade NFTs and play around with the AI.



How we built it
![image](https://raw.githubusercontent.com/Bayurzx/adeai/master/screenshots/architecture.gif)

- The app was built with the help of the ReactJS Library and currently on top of the Aurora Testnet Network. DO NOT USE THE APP ON THE MAINNET.
- Users create a collection to house their NFTs. After creating a collection, you can then create your NFTs and then list them to be seen on the Marketplace. You need to setApprovalFor all before you can mint your token.
- Make sure to choose between having a fixed price NFT or an auctionable NFT
- You can choose to add a 3D version of your NFT make sure to check the walkthrough to see how to add
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

>  So Feel free to use the any of these and check the AI response (*Surprise, surprise😉*)


## Deploy Steps
- npx hardhat node
- npx hardhat run scripts/deploy.js --network testnet_aurora
- copy-item -path ".\artifact\*" -destination ".\src\artifact\" -recurse -Force

