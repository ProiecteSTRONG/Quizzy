import { GoogleAuthProvider, getAuth, signInWithPopup,signOut  } from "firebase/auth";
import "./App.css";
import {useState} from 'react';
import Tasks from './Tasks';
import { useLoginGithub } from "./AuthGithub";
import { useLogoutGithub } from "./useLogoutGithub";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

// import anonymous and email auth functions
import { signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

function App() {

  // google auth
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();

  const [authorizedUser, setAuthorizedUser] = useState(Boolean(sessionStorage.getItem("accessToken")));

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // Access token of user
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(user){
          user.getIdToken().then((tkn)=>{
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          })
        }
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function logoutUser(){
    signOut(auth).then(() => {      
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);
      // window.location.replace("/");
      alert('Logged Out Successfully');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }
  
  // github auth
  const { user, authIsReady } = useContext(AuthContext);
  console.log(user);
  const { login, isPending, } = useLoginGithub();
  const { logout } = useLogoutGithub();

  // anonymous auth
  const [anonError, setAnonError] = useState<any>(false);
  const [anonPending, setAnonPending] = useState(false);
  const anonAuth = getAuth();
  const anonLogin = async () => {
    setAnonError(false);
    setAnonPending(true);

    try {
      const res = await signInAnonymously(anonAuth);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      setAnonPending(false);

    } catch (error) {
      console.log(error);
      // setAnonError(error.message);
      setAnonPending(false);
    }
  };

  // email auth
  const [emailError, setEmailError] = useState<any>(false);
  const [emailPending, setEmailPending] = useState(false);
  const emailAuth = getAuth();
  const emailLogin = async () => {
    setEmailError(false);
    setEmailPending(true);
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const passwd = (document.getElementById("passwd") as HTMLInputElement).value;
    console.log(email, passwd);
    try {
      const res = await signInWithEmailAndPassword(emailAuth, email, passwd);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      setEmailPending(false);

    } catch (error) {
      console.log(error);
      // setEmailError(error.message);
      setEmailPending(false);
    }
  };

  // email auth register
  const [emailRegError, setEmailRegError] = useState<any>(false);
  const [emailRegPending, setEmailRegPending] = useState(false);
  const emailRegAuth = getAuth();
  const emailReg = async () => {
    setEmailRegError(false);
    setEmailRegPending(true);

    const email = (document.getElementById("email_reg") as HTMLInputElement).value;
    const passwd = (document.getElementById("passwd_reg") as HTMLInputElement).value;

    try {
      const res = await createUserWithEmailAndPassword(emailRegAuth, email, passwd);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      setEmailRegPending(false);

    } catch (error) {
      console.log(error);
      // setEmailRegError(error.message);
      setEmailRegPending(false);
    }
  };


  return (
    <div className="App">
     {authorizedUser ? (
        <>
          <p>Authorized user</p>
          <h1>Tasks</h1>
          <Tasks token={sessionStorage.getItem("accessToken")}/>
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ): (
        <>
      <button onClick={signInwithGoogle}>SignWithGoogle</button>
        </>
      )}

      <div>
        { !user ?
        <button className="btn" onClick={login}>
            {isPending ? "Loading..." : "Login With Github"}
        </button>
          :
        <button className="btn" onClick={logout}>
          Log Out
        </button>
        }
      </div>

      {/* anonymous auth */}
    <div>
      <button className="btn" onClick={anonLogin}>
        {anonPending ? "Loading..." : "Login Anonymously"}
      </button>
      {anonError && <div className="error">{anonError}</div>}
    </div>

    {/* email auth */}
    <div>
      <input type="email" id="email"/>
      <input type="password" id="passwd"/>
      <button className="btn" onClick={emailLogin}>
        {emailPending ? "Loading..." : "Login With Email"}
      </button>
      {emailError && <div className="error">{emailError}</div>}
    </div>

    {/* email auth register */}
    <div>
      <input type="email" id="email_reg"/>
      <input type="password" id="passwd_reg"/>
      <button className="btn" onClick={emailReg}>
        {emailRegPending ? "Loading..." : "Register With Email"}
      </button>
      {emailRegError && <div className="error">{emailRegError}</div>}
    </div>




    </div>
  );
}

export default App;