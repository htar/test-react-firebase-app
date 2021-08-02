import firebase from "./firebase";
const POSTS = "posts";

const FirestoreService = {
  collectionRef(collection) {
    return firebase.firestore().collection(collection);
  },
  onCollectionUpdate(querySnapshot = [], callback = () => {}) {
    const posts = (querySnapshot.docs || []).map((doc) => doc.data());
    callback(posts);
  },
  getPost(query, callback = () => {}) {
    const ref = this.collectionRef(POSTS).doc(query);
    ref.get().then((doc) => {
      if (doc.exists) {
        callback(doc.data());
      } else {
        console.log("No such posts!");
      }
    });
  },
  getPosts(callback = () => {}) {
    const ref = this.collectionRef(POSTS);
    const unsubscribe = ref.onSnapshot(
      { includeMetadataChanges: true },
      (snapshot) => this.onCollectionUpdate(snapshot, callback),
      (err) => {
        console.log("getPosts error", err);
      },
      () => unsubscribe()
    );
  },
  updatePost(dataToSave = {}, callback = () => {}) {
    if (!dataToSave.id) return;
    const updateRef = this.collectionRef(POSTS).doc(dataToSave.id);
    updateRef
      .set(dataToSave)
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error("Error update post: ", error);
      });
  },
  setPost(dataToSave, callback = () => {}) {
    const ref = this.collectionRef(POSTS);

    ref
      .add(dataToSave)
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error("Error adding post: ", error);
      });
  },
  deletePost(id, callback = () => {}) {
    const ref = firebase.firestore().doc(`${POSTS}/${id}`);
    ref
      .delete()
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error("Error removing post: ", error);
      });
  },
};
export default FirestoreService;
