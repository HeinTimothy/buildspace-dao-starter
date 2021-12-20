import { useEffect, useMemo, useState } from 'react';

import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';

import pants from './pants.png'

const sdk = new ThirdwebSDK("rinkeby");
console.log(sdk);
const bundleDropModule = sdk.getBundleDropModule(
  "0xAa53cC974DF9f1c9516C7fEf3e4f263b3F973Ffc",
);
console.log(bundleDropModule);
const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  //const signer = provider ? provider.getSigner() : undefined;
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if(!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if(balance.gt(0)) {
          setHasClaimedNFT(true)
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to get nft balance", error)
      })
  }, [address])
/*
  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer])
*/
  if(!address) {
    return (
      <div className="landing">
        <h1>Welcome to Flannel DAO</h1>
        <h3>Flannel pjs are the new business formal</h3>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }

  if(hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>Flannel DAO Member Page <img src={pants} style={{"width": "2rem", "objectFit": "contain"}}/></h1>
        <p>Welcome!</p>
      </div>
    )
  }

  const mintNFT = () => {
    setIsClaiming(true)
    bundleDropModule
      .claim("0", 1)
      .catch((err) => {
        console.error("failed to claim", err);
      })
      .finally(() => {
        setIsClaiming(false);
        setHasClaimedNFT(true)
        console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
      })
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free Flannel DAO NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNFT()}
      >
        {isClaiming ? "Minting..." : "Mint your nft!"}
      </button>
    </div>
  );
};

export default App;
