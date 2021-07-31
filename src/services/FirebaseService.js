import {firestore} from "./firebase";

const FirestoreService = {

  getPosts(){
    const posts = firestore.collection('posts').get()
    console.log(',,,,,,,,,,,,,,,',posts);
    
  }
}
export default FirestoreService;