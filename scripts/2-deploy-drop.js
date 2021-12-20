import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'

const app = sdk.getAppModule("0x9327647b750Fd44e74863f03c1126a2e9bd9b603");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "Flannel DAO Membership",
      description: "A community of pj wearing professionals",
      image: readFileSync("scripts/assets/flannel.jpg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.error("failed to deploy bundleDrop module", error);
  }
})()
