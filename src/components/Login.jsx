import Header from "./Header";
import { useState, useRef } from "react";
import { validate } from "../../src/utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const handleLoginClick = () => {
    console.log(isSignIn);

    const validation = validate(
      emailRef.current.value,
      passwordRef.current.value
    );

    setError(validation);

    if (validation !== null) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: nameRef.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              console.log("auth", auth.currentUser);
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              setError(errorCode + " " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setError(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("signin user", user);
          updateProfile(auth.currentUser, {
            displayName: user.displayName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              console.log("sign in auth", auth.currentUser);
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              setError(errorCode + " " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setError(errorCode + " " + errorMessage);
        });
    }
  };

  const handleToggleSignInSignUp = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div
      className="bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%),url('https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg')] h-screen bg-cover bg-center
    "
    >
      <Header />
      <div className="bg-black/60 w-[500px] m-auto py-6 px-20 rounded-lg">
        <h1 className="text-white text-2xl font-bold mb-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {!isSignIn && (
            <input
              className="text-gray-400 border-2 border-gray-400 rounded-sm py-2 px-4 w-full mb-4"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              ref={nameRef}
            />
          )}
          <input
            className="text-gray-400 border-2 border-gray-400 rounded-sm py-2 px-4 w-full mb-4"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />

          <input
            className="text-gray-400 border-2 border-gray-400 rounded-sm py-2 px-4 w-full mb-4"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
          {!isSignIn && (
            <input
              className="text-gray-400 border-2 border-gray-400 rounded-sm py-2 px-4 w-full mb-6"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          )}

          {error !== null && (
            <div className="text-red-700 font-semibold text-lg mb-2">
              {error}
            </div>
          )}

          <button
            className="bg-[#e50914] text-sm text-white font-semibold px-4 py-3 h-fit rounded-sm  cursor-pointer w-full mb-6"
            onClick={handleLoginClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <div className="text-gray-400">
            {isSignIn ? "New to Netflix?" : "Already a user?"}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={handleToggleSignInSignUp}
            >
              {isSignIn ? "Sign up now." : "Sign In"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
