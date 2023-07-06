import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { AuthContext } from "./contexts/AuthContext";
import { useContext, useState } from "react";

export const useLoginGithub = () => {
  const [error, setError] = useState<any>(false);
  const { dispatch } = useContext(AuthContext);

  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();

  const login = async () => {
    setError(false);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      dispatch({ type: "LOGIN", payload: user });

      console.log(user);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    //   setError(error.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};