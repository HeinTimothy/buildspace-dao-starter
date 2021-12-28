import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0xb0cBEA94C3C4eDf119af6CA601ce2FB9741681B7");

(async () => {
  try {
    const amount = 1200000;
    const amountWithDecimals = ethers.utils.parseUnits(amount.toString(), 2);
    await tokenModule.mint(amountWithDecimals);
    const totalSupply = await tokenModule.totalSupply();

    console.log("✅ There now are", ethers.utils.formatUnits(totalSupply, 2), "PANTS in circulation");
  } catch(error) {
    console.error("Failed to print money", error);
  }
})()
