### <a href="https://abhinav7903.github.io/Meme/" target="_blank">Demo</a>

# Firebase Image Upload and Management README

This README provides an overview of a web application that allows users to upload images to Firebase Storage, display uploaded images, and manage them based on their age. The application is built using HTML, JavaScript, and Firebase.

## Prerequisites

Before using this application, ensure you have the following prerequisites:

- Firebase Project: You should have a Firebase project set up with Authentication, Firestore, and Firebase Storage enabled.

- Firebase Configuration: Obtain and configure your Firebase project credentials (apiKey, authDomain, projectId, etc.) and add them to your JavaScript file (app.js).

## Installation

To set up and run this Firebase Image Upload and Management application, follow these steps:

1. Clone or download the repository containing the HTML, CSS, and JavaScript files.

2. Replace the Firebase configuration in the JavaScript code (`app.js`) with your own Firebase project credentials.

3. Upload this code to a web hosting service or run it locally by opening the HTML file in a web browser.

## Usage

### Anonymous Sign-In

- Users can click the "Sign In Anonymously" button to sign in anonymously using Firebase Authentication. This allows them to upload images.

### Image Upload

- After signing in, users can select one or more image files to upload by clicking the "Choose File" button and then the "Upload" button.

- Images are uploaded to Firebase Storage with unique filenames that include the user's ID and a timestamp.

### Image Display

- Uploaded images are displayed below the upload section.

- The images are retrieved from Firebase Storage and displayed along with the user's ID who uploaded them.

### Image Deletion

- Images that are older than a specified time limit (in milliseconds) are automatically deleted from both Firebase Storage and the Realtime Database.

- The time limit for deletion is set to 20 seconds in the provided code. You can adjust this limit according to your requirements.

### Automatic Page Refresh

- The page automatically refreshes every 30 seconds to ensure that deleted images are removed from the display.

## Customization

You can customize this application to fit your specific requirements:

- **Firebase Configuration**: Update the Firebase project credentials in the JavaScript code (`app.js`) to match your Firebase project.

- **Time Limit for Deletion**: Modify the time limit (in milliseconds) for deleting images from both Storage and the Realtime Database. Adjust the values in the `deleteOldImagesFromStorage` and `deleteImageFromDB` functions.

- **User Interface**: Customize the HTML and CSS to change the application's appearance and layout.

## Troubleshooting

If you encounter any issues while using the application, consider the following troubleshooting steps:

- Check the Firebase project configuration to ensure that Firebase Authentication, Firestore, and Firebase Storage are properly enabled.

- Verify that your Firebase project credentials (apiKey, authDomain, projectId, etc.) are correctly configured in the JavaScript code.

- Review the code for any JavaScript errors in the browser's developer console that might affect the application's functionality.


## Acknowledgments

- This application was developed using Firebase for authentication, storage, and database functionality.

- Special thanks to the Firebase team for providing an excellent platform for building web applications with real-time features.
