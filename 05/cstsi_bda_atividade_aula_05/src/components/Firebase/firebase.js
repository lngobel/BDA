import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {
    getDatabase,
    set,
    ref
} from "firebase/database"
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {

    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.db = getDatabase(this.app)
        this.auth = getAuth();
        this.isLogged = false;
        this.credentials =null;
    }

    // *** AUTH API ***
    async doCreateUserWithEmailAndPassword(email, password) {
        try {
           //implemente aqui a função para criar um usuário
           this.credentials = await createUserWithEmailAndPassword(this.auth,email,password);
           const newUser = await set(ref(this.db,'users/' + this.credentials.user.uid),{
            "email": email,
           })
        } catch (error) {
            console.error(error.message)
            throw error;
        }
    }

    async doSignInWithEmailAndPassword(email, password) {
        try {
            /**
            Quando o usuário estiver logado atribua o valor TRUE
            ao atributo this.isLogged e as credenciais ao atributo this.credentials
            deverá retornar a propriedade user do atributo this.credentials.user
            */
           //implemente aqui função logar o usuario
           this.credentials = await signInWithEmailAndPassword(this.auth,email,password)
           this.isLogged = true
           return this.credentials.user
        } catch (error) {
            console.error(error.message)
            throw error;
        }
    }

    doSignOut = () => {
        signOut(this.auth) ? this.isLogged=false : this.isLogged=true
        console.log(this.isLogged)
    };
}

export default Firebase;
