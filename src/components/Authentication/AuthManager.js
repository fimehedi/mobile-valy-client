import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';


export const initializeAuthApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, email } = res.user;
            return {
                name: displayName,
                email
            }
        })
        .catch(err => {
            return {
                errorCode: err.code,
                errorMsg: err.message
            }
        })
}

export const facebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, email } = res.user;
            return {
                name: displayName,
                email
            }
        })
        .catch(err => {
            return {
                errorCode: err.code,
                errorMsg: err.message
            }
        })
}



export const createUserWithEmailPass = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            res.user.updateProfile({
                displayName: name,
            })
            return {
                isCreated: res.additionalUserInfo.isNewUser
            }
        })
        .catch(err => {
            return {
                errorCode: err.code,
                errorMsg: err.message
            }
        })
}

export const signInWithEmailPass = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const { displayName, email } = res.user;
            return {
                name: displayName,
                email
            }
        })
        .catch(err => {
            return {
                errorCode: err.code,
                errorMsg: err.message
            }
        })
}