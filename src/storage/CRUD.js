import { collection, getDocs, addDoc,doc,updateDoc, deleteDoc  } from "firebase/firestore/lite";
import { db } from "../firebase/index";

/*****************************CRUD************************************** */
/**USERS**/
async function AddUser(userId, email, name, lastName) {
  await addDoc(collection(db, "Users"), {
    name: name,
    lastName: lastName,
    email: email,
    description: "Add a description",
    userId: userId,
  });
}
/**POSTS */
// async function NewPost(){

// }
// async UpdatePost(userEmail, html){

// }

/******************************************************************* */
async function UserExist(email) {
  var userExists = false;
  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      userExists = true;
    }
  });

  return userExists;
}

//Get total post of an user using his email
async function TotalPosts(email) {
  var postCount = 0;
  const querySnapshot = await getDocs(collection(db, "Posts"));
  querySnapshot.forEach((doc) => {
    if (doc.data().authorEmail === email) {
      postCount++;
    }
  });
  return postCount;
}
/**Create id for post */
function Createid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/**UPDATE POST */
async function EditPost(postId, title, html, email){
  const today = new Date();
  const updatePost = doc(db, "Posts", postId);

  await updateDoc(updatePost,{
    postId: postId,
        title: title,
        content: html,
        authorEmail: email,
        date: today,
  })

}
//Delete post
async function RemovePost(postId){
  await deleteDoc(doc(db,"Posts",postId));
}

export { UserExist, AddUser, Createid,EditPost,RemovePost,TotalPosts };
