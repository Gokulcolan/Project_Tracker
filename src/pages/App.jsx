// import logo from './logo.svg';
import "../styles/App.css"
import { useRoutes } from 'react-router-dom';
import Loader from '../componenets/common/Loader/Loader';
import { getRoutes } from '../layout/routes';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const userRole =
    typeof window !== "undefined" ? sessionStorage.getItem("ur") : null;
  const routeType = userRole !== null ? userRole : 0;
  const router = useRoutes(getRoutes(routeType));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Assume data loading takes 3 seconds
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader type="spin" color="#00f" /> // You can change type and color as needed
      ) : (
        <div>{router}</div> // Replace this with the actual content you want to display after loading
      )}
    </div>
  );
}

export default App;
