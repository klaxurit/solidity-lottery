import Web3 from 'web3';

const address = "0xa0F75584A8662FE8abE00cA7D7B5A2F1b1Ce0B7D";
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default(({app}, inject) => {
    window.ethereum.request({ method: "eth_requestAccounts" });

    const webClient = new Web3(window.ethereum)
    inject('wallet', webClient)

    const web3 = new Web3(Web3.givenProvider);


    const web3Contract = new web3.eth.Contract(abi, address)
    inject('lottery', web3Contract)
})