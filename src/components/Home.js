import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (auth?.user) {
      async function getDummyUser() {
        try {
          const data = await axiosPrivate.get("/dummy");
          console.log(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      getDummyUser();
    }
  }, []);

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
