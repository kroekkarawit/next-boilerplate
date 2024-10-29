import { useEffect } from "react";

import { useUser } from "@/app/context/UserContext";

const BalanceUpdater = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the latest user data from the server
        const response = await fetch("/api/user");
        const data = await response.json();

        if (response.ok) {
          // Update the user context with the fetched data
          setUser((prevUser: any) => ({
            ...prevUser,
            balance: data.data.balance,
            name: data.data.name, // Update other fields as needed
            email: data.data.email,
          }));
        } else {
          //console.error("Failed to fetch user data:", data.error);
        }
      } catch {
        //console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const intervalId = setInterval(fetchUserData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [setUser]);

  return null;
};

export default BalanceUpdater;
