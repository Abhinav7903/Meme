import { auth, signInAnonymously, signOut, storage, ref, uploadBytes, get,listAll, getDownloadURL, getMetadata,database, dbRef, push, onValue, deleteObject, remove, child } from "./app.js";


document.getElementById("anonymousSignInBtn").addEventListener("click", login);

function login(e) {
  e.preventDefault();
  const user = auth.currentUser;

  signInAnonymously(auth)
    .then(() => {
      alert("Logged in anonymously");
      if (user) {
        console.log(user.uid);

        window.location.href = "index.html";
      }
      // Update the UI to reflect a signed in user


    })
    .catch((error) => {

      console.error("Error during anonymous sign-in:", error);
      alert("An error occurred during anonymous sign-in. Check the console for details.");
    });
}


document.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      console.log('User is signed in');
      console.log(user.uid);
      const logoutDiv = document.getElementById('logout');
      document.getElementById('loginStatus').style.display = 'none';
      document.getElementById('imageUpload').style.display = 'block';
      document.getElementById('imageDisplay').style.display = 'block';
      document.getElementById('userID').innerHTML = "User ID: " + user.uid;
      if (logoutDiv) {
        logoutDiv.style.display = 'block';
      }

    } else {
      // No user is signed in, stay on the page
      const loginStatusDiv = document.getElementById('loginStatus');
      if (loginStatusDiv) {
        loginStatusDiv.style.display = 'block';
      }
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        alert('Logged out');
        window.location.href = 'index.html';
      })
      .catch((error) => {

        console.error('Error during logout:', error);
        alert('An error occurred during logout. Check the console for details.');
      });
  });
});


//Firebase storage image upload funtion :) 🥹
document.getElementById("uploadBtn").addEventListener("click", async function () {
  var imageInput = document.getElementById("imageInput");
  // var uploadedImagesList = document.getElementById("uploadedImagesList");
  const user = await getCurrentUser(); // Asynchronously get the user ID

  for (var i = 0; i < imageInput.files.length; i++) {
    var selectedImage = imageInput.files[i];


    if (selectedImage) {
      // Generate a unique filename
      var timestamp = Date.now();
      var fileName = user + "_" + timestamp + "_" + selectedImage.name;

      // Upload the image to Firebase Storage
      var storageRef = ref(storage, "meme/" + fileName);
      var uploadTask = uploadBytes(storageRef, selectedImage,timestamp);

      uploadTask.then((snapshot) => {
        alert("Image uploaded successfully!");

        getDownloadURL(snapshot.ref).then((imageURL) => {
          var imagesRef = dbRef(database, "images");
          push(imagesRef, {
            imageURL: imageURL,
            userID: user,
            timestamp: timestamp,
            fileName: fileName,
          });
        });
      }).catch((error) => {
        console.error("Error during image upload:", error);
      });

    }
  }

  document.getElementById("imageDisplay").style.display = "block"; // Show the image display section
});

onValue(dbRef(database, "images"), (snapshot) => {
  var imagesList = snapshot.val();
  uploadedImagesList.innerHTML = ""; // Clear the list before adding new items

  for (const key in imagesList) {
    var imageInfo = imagesList[key];

    var listItem = document.createElement("li");
    var img = document.createElement("img");
    img.src = imageInfo.imageURL;
    img.alt = "Uploaded Image";

    var userID = document.createElement("p");
    userID.textContent = "User ID: " + imageInfo.userID;

    listItem.appendChild(img);
    listItem.appendChild(userID);

    uploadedImagesList.appendChild(listItem);
  }
});



async function getCurrentUser() {
  return new Promise((resolve, reject) => {

    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user.uid);
      } else {
        reject("User not authenticated");
      }
    });
  });
}



// Function to delete images older than 2 hours
async function deleteOldImagesFromStorage() {
  const imagesRef = ref(storage, "meme/");
  const dbTimestampRef = dbRef(database, "images/");
  
  try {
   const snapshot = await get(dbTimestampRef);
    const currentTime = Date.now();
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Loop through each child node
      for (const imageKey in data) {
        if (data.hasOwnProperty(imageKey)) {
          const imageInfo = data[imageKey];
          console.log("Image Key:", imageKey);
          console.log("File Name:", imageInfo.fileName);
          console.log("Timestamp:", imageInfo.timestamp);
          // Calculate the time difference in milliseconds
          const timeDifference = currentTime - imageInfo.timestamp;
          if (timeDifference >= 20000) {
            const imageRefToDelete = ref(imagesRef, imageInfo.fileName);
            // Remove the image node if the condition is met
            await deleteObject(imageRefToDelete);
            console.log("Image deleted successfully from the Storage.", imageInfo.fileName);
          } else {
            console.log("Image is within the time limit.");
          }
        }
      }
    } else {
      console.log("No data found in the 'images' node.");
    } 
  }catch(error){
    console.log(error);
  }

}

const ct=Date.now();
console.log(ct)
// // Call the async function to delete images
setInterval(() => {
  deleteOldImagesFromStorage();refreshPageAfterDelay(); //rel 2hrs
}, 20000);



// Function to delete images older than 2hrs and 30 sec hours

async function deleteImageFromDB() {
  const imagesRef = dbRef(database, "images/");

  try {
    const snapshot = await get(imagesRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const currentTime = Date.now();

      // Loop through each child node
      for (const imageKey in data) {
        if (data.hasOwnProperty(imageKey)) {
          const imageInfo = data[imageKey];
          console.log("Image Key:", imageKey);
          console.log("File Name:", imageInfo.fileName);

          // Calculate the time difference in milliseconds
          const timeDifference = currentTime - imageInfo.timestamp;

         
          if (timeDifference >= 20000 ) {

            const imageRefToDelete = child(imagesRef, imageKey);

            // Remove the image node if the condition is met
            await remove(imageRefToDelete);

            console.log("Image deleted successfully from the Realtime Database.", imageInfo.fileName);
          } else {
            console.log("Image is within the time limit.");
          }
        }
      }
    } else {
      console.log("No data found in the 'images' node.");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}


setInterval(() => {
  deleteImageFromDB(); refreshPageAfterDelay(); //rel 2hrs
}, 20000 );


function refreshPageAfterDelay() {
  location.reload(false);
}

setInterval(() => {
  refreshPageAfterDelay(); // Reload the page after 5 hours
},30000);



