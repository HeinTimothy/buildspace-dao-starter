import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule("0x9327647b750Fd44e74863f03c1126a2e9bd9b603");

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "FlannelDAO's Proposals",
      votingTokenAddress: "0xb0cBEA94C3C4eDf119af6CA601ce2FB9741681B7",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log("✅ Successfully deployed vote:", voteModule.address);
  } catch (error) {
    console.error("Failed to deploy vote module", error);
  }
})();
