import React, {useEffect, useRef, useState} from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import './assets/theme.css'
import {Input} from 'reactstrap';

import "./App.css";
import Loading from "./components/Loading";

const App = () => {

    const [storageValue, setStorageValue] = useState("__none__");
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [word, setWord] = useState("");
    const [amount, setAmount] = useState(0);

    const didMount = useRef(false);

    useEffect(async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            await setWeb3(web3);
            await setAccounts(accounts);
            await setContract(instance);
        } catch (error) {
            console.error(error);
        }
    }, [])

    const runExample = async () => {
        await contract.methods.set(word).send({from: accounts[0],
            value: web3.utils.toWei(amount, 'ether')})
        await getMetaName();
    };

    const getMetaName = async () => {
        const response = await contract.methods.get().call();
        console.log(contract);
        await setStorageValue(response);
    }

    if (!web3) {
        return <Loading />
    }
    return (
        <div className="bg-dark full-page center  ">
            <div className="d-flex h-90 justify-content-around flex-column center">
                <div className="text-light text-center">
                    <p className="main-topic">ZKOOPA</p>
                    <h6>World first 'META name' generator</h6>
                </div>
                <div>
                    <h1 className="text-success">YOUR META NAME: <span className="text-danger">{storageValue}</span>
                    </h1>
                </div>
                <div className="d-flex center flex-column p-0">
                    <h6 className="text-light text-align-left">Enter your meta name here...</h6>
                    <Input
                        onChange={e => setWord(e.target.value)}
                        className="w-100"/>
                    <h6 className="text-light text-align-left mt-4">Amount (Etherium)</h6>
                    <Input
                        type="number"
                        onChange={e => setAmount(e.target.value)}
                        className="w-50 mb-4"/>
                    <button
                        onClick={runExample}
                        className="btn-primary btn mt-3">CLICK TO SUBMIT
                    </button>
                    <button
                        onClick={getMetaName}
                        className="btn-primary btn mt-3">YOUR NAME
                    </button>
                    <h6 className="text-warning mt-4">*. Current META NAME price: <span
                        className="text-danger text-bold text-lg">1 ETHER</span></h6>
                </div>
            </div>
        </div>
    );
}

export default App