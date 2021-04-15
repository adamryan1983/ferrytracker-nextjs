const authorize = async () => {
  const firebase = await import("firebase/app");
  await import("firebase/auth");
  const firebaseConfig = await import("@lib/firebaseConfig");

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const auth = firebase.auth();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
export { authorize, signInWithGoogle, auth };
