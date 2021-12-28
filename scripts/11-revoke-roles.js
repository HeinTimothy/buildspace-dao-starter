import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule("0xb0cBEA94C3C4eDf119af6CA601ce2FB9741681B7");
(async () => {
  try {
    console.log("👀 Roles that exist right now:", await tokenModule.getAllRoleMembers());
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log("🎉 Roles after revoking ourselves", await tokenModule.getAllRoleMembers());
    console.log("✅ Successfully revoked our permissions from the ERC-20 contract");
  } catch (error) {
    console.error("failed to revoke ourselves from DAO treasury", error);
  }
})()
