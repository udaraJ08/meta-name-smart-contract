async function main() {
    const {API_URL, PRIVATE_KEY} = process.env;
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x29Cc80095b5A34706cc16b55c90D1E30814BB831' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
        'to': '0x29Cc80095b5A34706cc16b55c90D1E30814BB831', // faucet address to return eth
        'value': 100,
        'gas': 30000,
        'maxFeePerGas': 1000000108,
        'nonce': nonce,
        // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

main();