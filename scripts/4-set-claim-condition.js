import sdk from "./1-initialize-sdk.js"

const bundleDrop = sdk.getBundleDropModule(
  "0xAa53cC974DF9f1c9516C7fEf3e4f263b3F973Ffc",
);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();

    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 1200,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("✅ Sucessfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})()
