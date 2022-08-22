import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home/index.js";
import Web3 from "web3/dist/web3.min";//-> in this way works with webpack > 5

function App() {
    useEffect(() => {
        if (window.ethereum) {
            //Old implementation
            // window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => { console.log(accounts) });

            const web3 = new Web3(window.ethereum);
            web3.eth.requestAccounts().then(console.log);

        }

    }, []);

    return (
        //Ya que en la V6 de React Router se remplaza “component” por “element”, https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md#advantages-of-route-element
        < Routes >
            <Route path="/" element={<Home />} />
        </Routes >
    );
}

export default App;