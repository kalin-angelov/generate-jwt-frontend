import { Link } from "react-router-dom";

const Home = () => {

    return (
        <main>
            <article className="container">

                <h2 className="main-header">Entry pass</h2>
                <figure className="img-container">
                    <img className="main-logo" src="/images/logo.png" width="180px" alt="logo-img" />
                </figure>
                <p className="welcome-message">Let me see your entry pass.</p>

                <Link to={"/register"}>
                    <button className="btn start-btn">
                        Get Started
                    </button>
                </Link>

            </article>
        </main>
    );
};

export default Home;
