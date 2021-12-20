import sdk from './1-initialize-sdk.js'
import  { readFileSync } from 'fs'

const bundleDrop = sdk.getBundleDropModule(
  "0xAa53cC974DF9f1c9516C7fEf3e4f263b3F973Ffc",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Red Flannel",
        description: "First level of Flannel DAO",
        image: readFileSync("scripts/assets/redflannel.jpg")
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
