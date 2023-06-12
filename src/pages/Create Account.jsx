function CreateAccount() {
  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="create-account">
          <div className="image_flex">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/image-placeholder-85@1x.png"
              alt=""
            />
          </div>
          <div className="create">
            <div className="head_c">
              <h1>Create Account</h1>
              <p>Welcome! Enter Your Details And Start</p>
              <p>Creating, Collecting And Selling Nfts.</p>
            </div>
            <form>
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user-4@2x.svg"
                  alt=""
                />
                <input type="text" placeholder="Username" />
              </label>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/envelopesimple-4@2x.svg"
                  alt=""
                />
                <input type="email" placeholder="Email Address" />
              </label>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/lockkey@2x.svg"
                  alt=""
                />
                <input type="password" placeholder="Password" />
              </label>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/lockkey@2x.svg"
                  alt=""
                />
                <input type="password" placeholder="Confirm Password" />
              </label>
              <br />
              <button className="btn">Create account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
