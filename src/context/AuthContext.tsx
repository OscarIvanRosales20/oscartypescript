import {createContext, ReactNode, useContext, useEffect, useState}from "react"
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged,signInWithEmailAndPassword,signInWithPopup, signOut, Unsubscribe, User } from "firebase/auth"

import {auth, db} from "../firebase-config"
import { getFirestore } from "firebase/firestore"
import { Alert } from "react-bootstrap"

interface AuthContextType{
    usuarioActual: User |null
    db: ReturnType<typeof getFirestore>
    loginGoogle: ()=>Promise<User>
    loginFace: ()=>Promise<User>
    registrarCorreoContraseña: (email: string, password: string)=>Promise<User>
    entrarCorreoContraseña: (email: string, password: string)=>Promise<User>
    salir: ()=>Promise<void>
    cambiosAutenticacion: (callback: (user: User | null) => void) => Unsubscribe
}

const traducirError = (code: string) => {
  const errores: Record<string, string> = {
    "auth/email-already-in-use": "Este correo ya está en uso.",
    "auth/weak-password": "La contraseña es demasiado débil.",
    // otros...
  };
  return errores[code] || "Ha ocurrido un error inesperado.";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth= ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("ERROR")
    }
    return context
}

export const AuthProvider = ({children}:{children: ReactNode})=>{
    const [usuarioActual, setUser] = useState<User|null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user ? user:null)
        })
        return ()=> unSubscribe()
    },[])

 const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log("Logged in with Google:", user.displayName, user.email);
    return user;
  } catch (error: any) {
    // Handle Errors here.
    console.error("Google Sign-In Error:", error.code, error.message);
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('User closed the sign-in popup.');
    }
    throw error; // Re-throw to allow component to handle it
  }
};
    // --- 2. Facebook Sign-In ---
const loginFace = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log("Logged in with Facebook:", user.displayName, user.email);
    return user;
  } catch (error: any) {
    // Handle Errors here.
    console.error("Facebook Sign-In Error:", error.code, error.message);
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('User closed the sign-in popup.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
        alert("An account already exists with the same email address but different sign-in credentials. Please sign in using your existing method.");
    }
    throw error;
  }
};
// --- 3. Email/Password Sign-Up ---
const registrarCorreoContraseña = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Registered with Email/Password:", user.email);
    setErrorMsg('')
    return user;
  } catch (error: any) {
    console.error("Email/Password Registration Error:", error.code, error.message);
    if (error.code === "auth/email-already-in-use") {
        setErrorMsg(traducirError(error.code));
    } else if (error.code === "auth/weak-password") {
        setErrorMsg(traducirError(error.code));
    } else {
        setErrorMsg("Error al registrar usuario.");
    }
    throw error;
  }
};

// --- 4. Email/Password Sign-In ---
const entrarCorreoContraseña = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signed in with Email/Password:", user.email);
    return user;
  } catch (error: any) {
    console.error("Email/Password Sign-In Error:", error.code, error.message);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Invalid email or password.');
    }
    throw error;
  }
};

// --- 5. Logout ---
const salir = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};

// --- 6. Observing Authentication State Changes (Crucial for UI updates) ---
// This function allows your app to react to login/logout events
const cambiosAutenticacion = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

    return (
        <>
        {errorMsg && (
        <Alert key={"danger"} variant={"danger"}>
            {errorMsg}
        </Alert>
        )}

        <AuthContext.Provider value={{usuarioActual,db, loginGoogle, loginFace, registrarCorreoContraseña, entrarCorreoContraseña, salir, cambiosAutenticacion }}>
            {children}
        </AuthContext.Provider>
        </>
        
    )
}
