import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x9327647b750Fd44e74863f03c1126a2e9bd9b603");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "FlannelDAO Governance Token",
      symbol: "PANTS",
    });
    console.log("✅ Successfully deployed token module, address:", tokenModule.address);
  }catch (error) {
    console.error("failed to deploy token module", error);
  }
})()
