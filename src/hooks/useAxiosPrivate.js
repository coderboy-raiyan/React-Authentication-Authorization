import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

function useAxiosPrivate() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        console.log(prevRequest);
        if (err?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
