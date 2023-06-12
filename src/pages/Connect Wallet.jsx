import { Link } from "react-router-dom";
function ConnectWallet() {
  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="connect-wallet">
          <div className="image_flex">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/image-placeholder-84@1x.png"
              alt=""
            />
          </div>
          <div className="connect">
            <div className="head_c">
              <h1>Connect Wallet</h1>
              <p>Choose a wallet you want to connect.</p>
              <p>There are several wallet providers.</p>
              <div className="btns">
                <Link className="c_btn" to="https://metamask.io/">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/metamask@2x.svg"
                    alt=""
                  />
                  <b>Metamask</b>
                </Link>
                <br />
                <Link className="c_btn" to="https://walletconnect.com/">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/walletconnect@2x.svg"
                    alt=""
                  />
                  <b>Wallet Connect</b>
                </Link>
                <br />
                <Link className="c_btn" to="https://www.coinbase.com/ru/">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/coinbase@2x.svg"
                    alt=""
                  />
                  <b>Coinbase</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;
