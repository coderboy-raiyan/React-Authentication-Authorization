import axios from "./../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh");
      setAuth(response?.data);
      return response.data.token;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
}

export default useRefreshToken;
