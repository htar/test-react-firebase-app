import { firestore } from "services/firebase";

const POSTS = "posts";
const USERS = "users";

const FirestoreService = {
  collectionRef(collection) {
    return firestore.collection(collection);
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

  updatePost(id, dataToSave = {}, callback = () => {}) {
    if (!id) return;
    const updateRef = firestore.doc(`${POSTS}/${id}`);
    updateRef
      .update(dataToSave)
      .then((res) => {
        console.log("res", res);

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
    this.collectionRef(POSTS)
      .doc(id)
      .delete()
      .then((res) => {
        console.log("res", res);

        callback();
      })
      .catch((error) => {
        console.error("Error removing post: ", error);
      });
  },
  getUserDocument(uid) {
    if (!uid) return null;
    try {
      return this.collectionRef(USERS).doc(uid);
    } catch (error) {
      console.error("Error fetching user", error.message);
    }
  },
  createUserProfileDocument : async (user, additionalData) =>{
    if (!user) return;
  
    // Get a reference to the place in the database where a user profile might be.
    const userRef = firestore.doc(`${USERS}/${user.uid}`);
  
    // Go and fetch the document from that location.
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user', error.message);
      }
    }
  
    return this.getUserDocument(user.uid);
  }
};
export default FirestoreService;
