import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

const bundleDropModule = sdk.getBundleDropModule("0xAa53cC974DF9f1c9516C7fEf3e4f263b3F973Ffc");
const tokenModule = sdk.getTokenModule("0xb0cBEA94C3C4eDf119af6CA601ce2FB9741681B7");

(async () => {
  try {
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if(walletAddresses.length == 0) {
      console.warn("No NFTs have been claimed yet!");
      process.exit(0)
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * 900 + 100);
      console.log("Airdropping ", randomAmount, " to ", address);
      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 2)
      }
      return airdropTarget
    });

    console.log("🌈 Starting airdrop!");
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens");
  } catch (error) {
    console.error("Failed airdrop", error);
  }
})()
