import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
      navigate("/");
    }
  }, []);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-4xl font-bold">Welcome to HTVision</div>
    </div>
  );
};

export default Dashboard;
