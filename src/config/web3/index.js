import Web3 from "web3/dist/web3.min";//-> in this way works with webpack > 5
import { InjectedConnector } from '@web3-react/injected-connector'

const connector = new InjectedConnector({
    supportedChainIds: [
        4 //Rinkeby
    ]
});

const getLibrary = (provider) => {
    return new Web3(provider) // this will vary according to whether you use e.g. ethers or web3.js
};

export { getLibrary, connector };
