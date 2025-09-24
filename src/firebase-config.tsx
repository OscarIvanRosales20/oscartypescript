import { initializeApp } from "firebase/app";
import { getAuth, Auth, User} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYTnq2NxRvvcS2ohSqzPvU1fzecPwFfCA",
  authDomain: "gestion-recursos-test.firebaseapp.com",
  projectId: "gestion-recursos-test",
  storageBucket: "gestion-recursos-test.firebasestorage.app",
  messagingSenderId: "847073985520",
  appId: "1:847073985520:web:e8416f32e904568c651335",
  measurementId: "G-QFCQ24TVZK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth: Auth = getAuth(app)
export type FirebaseUser = User