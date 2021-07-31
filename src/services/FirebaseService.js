import {firestore} from "./firebase";

const FirestoreService = {

  getPosts(){
    return firestore.collection('posts').get()
    
  }
}
export default FirestoreService;