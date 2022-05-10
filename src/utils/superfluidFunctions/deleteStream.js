import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export default async function deleteFlow(recipient, web3Provider, chainId) {
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();

    const superfluid = await Framework.create({
        chainId: Number(chainId),
        provider: provider,
    });

    const DAIxContract = await superfluid.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    const accounts = web3Provider.accounts

    try {
        
        const deleteFlowOperation = superfluid.cfaV1.deleteFlow({
            sender: accounts[0],
            receiver: recipient,
            superToken: DAIx,
        });

        console.log("Deleting your stream...");

        await deleteFlowOperation.exec(signer);

        console.log(
            `Congrats - you've just deleted your money stream!
            Network: Kovan
            Super Token: DAIx
            Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
            Receiver: ${recipient}
            `
        );
    } catch (error) {
        console.error(error);
    }
}