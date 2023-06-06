import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiInstance } from "../api";

function VerifyPage() {
  const [message, setMessage] = useState("Please wait...");
  const [searchParams] = useSearchParams();

  const discordCode = useMemo(() => searchParams.get("code"), [searchParams]);

  useEffect(() => {
    (async () => {
      if (discordCode && message !== "Done") {
        // Verify and Assign the Roles to the user with code
        try {
          await apiInstance.get(`/discord/verify/${discordCode}`);
        } catch (error) {
          console.log(error);
        }
        setMessage("Done");
      }
    })();
  }, [discordCode, message]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default VerifyPage;
