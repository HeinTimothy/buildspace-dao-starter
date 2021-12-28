import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0xBa0921679D29294C017af8f1214E544d455E16f6");
const tokenModule = sdk.getTokenModule("0xb0cBEA94C3C4eDf119af6CA601ce2FB9741681B7");

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);
    console.log("✅ Successfully gave vote module permissions");
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(process.env.WALLET_ADDRESS);

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    await tokenModule.transfer(voteModule.address, percent90);
    console.log("✅ Successfully transferred tokens");
  } catch (err) {
    console.error("failed to transfer tokens", err);
  }
})()
