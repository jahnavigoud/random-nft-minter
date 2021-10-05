import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);
const networkId = 97;

export const connectWallet = async () => {
    if (window.ethereum) {
      //switch if not connect to required network
      const chainId = await web3.eth.getChainId();
      console.log("chain id is "+chainId); 
      if(chainId!=networkId){
        //add in try block to handle if network to switch doesn't exist
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x61' }],
        });
      }
      console.log("Switched network");

      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
          connected:true
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };