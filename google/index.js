//const firebase = require('firebase')
import configFirebase from './assets/config.firebase';

class AppFirebase {

    constructor ( firebase ) {
        this._firebaseApp = 
            ! firebase.apps.length ? 
                firebase.initializeApp( configFirebase, 'mi-task-fbs' ) : 
                {}; 
        console.log('ok')   
    }
     initFirestore () { 
         let database = this._firebaseApp; 
         console.log( database );
         return database;  
     }
     
     initAuth () {
        let auth = this._firebaseApp.auth()
        return auth;
    }

    allFirebase () {
        return this._firebaseApp;
    }

 }

export default AppFirebase;