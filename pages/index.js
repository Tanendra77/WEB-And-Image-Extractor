import Link from "next/link";

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="headerTitle">Data Extraction </h1>
        <nav className="nav">
          <Link href="/web-extractor" legacyBehavior>
            <a className="link">Web Extractor </a>
          </Link>
      
          <Link href="/image-extractor" legacyBehavior>
            <a className="link">Image Extractor</a>
          </Link>

          <Link href="/Signup" legacyBehavior>
            <a className="link">Sign Up</a>
          </Link>

          <Link href="/Login" legacyBehavior>
            <a className="link">Login</a>
          </Link>

        </nav>
      </header>
      <main className="main">
        <h2>Explore various Extraction</h2>
        <div className="featureContainer">
          <Link href="/web-extractor" legacyBehavior>
            <a className="featureBox web-extractor">
              <h3>Web Extractor </h3>
              <p>Get assistance for your studies.</p>
            </a>
          </Link>
        
          
          <Link href="/image-extractor" legacyBehavior>
            <a className="featureBox image-extractor">
              <h3>Image Extractor</h3>
              <p>Plan and prepare for your career.</p>
            </a>
          </Link>
          
        </div>
        
      </main>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #0ef;
          font-family: "Monospace", monospace, sans-serif;
        }

        .header {
          background: url("https://t4.ftcdn.net/jpg/04/99/16/71/360_F_499167136_E58Feh6gtcophjpxUrk08DNky7HK3chH.jpg")
            center/cover no-repeat;
          color: #fff;
          padding: 40px 0;
          text-align: center;
          font-family: "Monospace", monospace, sans-serif;
        }

        .headerTitle {
          font-size: 3rem;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          font-family: "Monospace", monospace, sans-serif;
        }

        .nav {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .link {
          color: #fff;
          text-decoration: none;
          margin: 0 20px;
          font-size: 1.2rem;
          transition: color 0.2s;
        }

        .link:hover {
          color: #36d1dc;
        }

        .featureContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px 0;
        }

        .featureBox {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
          flex: 0 0 calc(33.33% - 40px);
          cursor: pointer;
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .featureBox:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
        }

        

        .web-extractor{
          background: white;
        }

        .image-extractor {
          background: #d37b7b;
        }

    
        .main {
          margin: 20px;
          font-size: 18px;
          text-align: center;
          flex: 1;
        }

        a {
          text-decoration: none;
          color: black;
          font-family: "Monospace", monospace, sans-serif;
        }

        .footerText {
          margin: 0;
          font-size: 1rem;
        }

        .featureRow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
