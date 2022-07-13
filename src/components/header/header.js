import logo from "../../logo.svg";

function Header() {
  return (
    <header className="Header header">
      <div className="top-nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src={logo} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;