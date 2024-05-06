import { useState, useEffect } from "react";
import { Dashboard } from "../Dashboard/Index";
import { Login } from "../Login/Login";

export const ComponentApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string>("");

  useEffect(() => {
    const storedData: string | null = localStorage.getItem("is_authenticated");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData) {
        setIsAuthenticated(parsedData);
      }
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};
