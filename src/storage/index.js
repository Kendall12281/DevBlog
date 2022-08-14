import { defineStore } from "pinia";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, setDoc, doc,updateDoc } from "firebase/firestore/lite";
import { UserExist, AddUser, Createid, EditPost, RemovePost,TotalPosts } from "./CRUD";
import { auth } from "../firebase/index";
import router from "../router/index";
import { db } from "../firebase/index";

export const useStore = defineStore("main", {
  state: () => ({
    activeUser: null,
  }),
  actions: {
    //Sign In with Google
    async SignInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      var user;
      await signInWithPopup(auth, provider).then((result) => {
        user = result.user;
      });
      //Vars
      var fullName = user.displayName.split(" ");
      var name = fullName[0];
      fullName[0] = "";
      var lastName = fullName.join(" ").trim();
      //User exists
      if (!(await UserExist(user.email))) {
        AddUser(user.uid, user.email, name, lastName);
      }

      this.FetchUser();
      router.push("/");
    },
    //Sign Up
    async SignUp(email, name, lastName, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        //Add user
        const userUid = auth.currentUser.uid;
        AddUser(userUid, email, name, lastName);
        //Set current user
        this.activeUser = {
          userId: userUid,
          email: email,
          name: name,
          lastName: lastName,
          description: "Add a description",
        };
        router.push("/");
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    //Sign In
    async SignIn(email, password, reset) {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        router.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            reset.value.classList.remove("greenBackground");
            reset.value.classList.add("error__handler");
            reset.value.textContent = "Email / Password Incorrect ";
            break;
        }
      }
    },
    //Change user status
    async FetchUser() {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.activeUser == null;
        } else {
          //Load info current user
          const querySnapshot = await getDocs(collection(db, "Users"));
          querySnapshot.forEach((doc) => {
            if (doc.data().email == user.email) {
              this.activeUser = {
                userId: doc.id,
                email: doc.data().email,
                name: doc.data().name,
                lastName: doc.data().lastName,
                description: doc.data().description,
              };
            }
          });

          if (router.isReady() && router.currentRoute.value.path === "/Login") {
            router.push("/");
          }
        }
      });
    },
    //New post
    async NewPost(title, html) {
      var today = Date();
      const postId = Createid(8);
      await setDoc(doc(db, "Posts", postId), {
        postId: postId,
        title: title,
        content: html,
        authorEmail: this.activeUser.email,
        date: today,
      });
    },
    async MyPosts() {
      var posts = [];
      const querySnapshot = await getDocs(collection(db, "Posts"));
      querySnapshot.forEach((doc) => {
        if (doc.data().authorEmail === this.activeUser.email) {
          posts.push(doc.data());
        }
      });
      return posts;
    },
    DeletePost(postId) {
      RemovePost(postId);
    },
    UpdatePost(postId, title, html) {
      EditPost(postId, title, html, this.activeUser.email);
    },
    async UpdateUserInfo(name, lastName, description) {
      const updateUser = doc(db, "Users", this.activeUser.userId);

      await updateDoc(updateUser, {
        name:name.toLowerCase(),
        lastName:lastName.toLowerCase(),
        description:description.toLowerCase()
      });
    },
     TotalPostUser(){
      return TotalPosts(this.activeUser.email)
    },
    async LoadPosts(){
      return await getDocs(collection(db, "Posts"));
    },
    //Sign Out
    SignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.activeUser = null;
        router.push("/");
      });
    },
  },
});
