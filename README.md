# Simple React app with deployed and DB in Firebase

Example https://simple-crud-4cf7c.web.app/

## Initial Set Up

- Take a tour of the application.
- Set up a new project in the Firebase console.
- Take a tour of the Firebase console.
- Go to the Database section and create a new Cloud Firestore.
  - Put it into test mode.

  ## Installing Firebase in Your React Application

  Let's add firebase config to .env
  https://github1s.com/firebase/snippets-web/blob/HEAD/auth/google-signin.js
  https://firebase.google.com/docs/auth/web/password-auth



rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /posts/{postId} {
    	allow read;
      allow create, update: if request.auth.uid != null && !resource.data.title  && !resource.data.content;
      allow delete: if request.auth.uid == resource.data.user.uid;
    }

  }
  match /users/{userId} {
    allow read, update, delete: if request.auth.uid == userId;
    allow create: if request.auth.uid != null;
  }
}