import { Injectable } from '@angular/core';
//import firebase from 'firebase';
import * as firebase from 'firebase';


@Injectable()
export class AuthData {
  constructor() {}

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
    
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email: string, password: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
         // firebase.database().ref('/users').child(email).set({
          //    firstName: "anonymous",
           //   id:newUser.uid,
         // });
        firebase.database().ref('/userProfile').child(newUser.user.uid).set({
            firstName: "anonymous",
             email: email
      });
    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser() {
    return firebase.auth().signOut();
  }


  createUserWitAPIComunidapp(provedor){
    return firebase.auth().signInWithRedirect(this.ObtenerProvider(provedor))
        .then(result => {
            return firebase.auth().getRedirectResult;
    });
  }


  ObtenerProvider(provedor){
    switch(provedor) { 
        case "Google": { 
          //statements; 
          return new firebase.auth.GoogleAuthProvider();
        } 
        case "Facebook": { 
          //statements; 
          return new firebase.auth.FacebookAuthProvider();
        } 
        case "Twitter": { 
          //statements; 
          return new firebase.auth.TwitterAuthProvider(); 
        } 
        default: { 
          //statements;
          return new firebase.auth.GoogleAuthProvider();
        } 
    } 
  }

}
