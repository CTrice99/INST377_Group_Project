
# INST377_Group_ 3_Project

                                                                  DogInformer

Our Project is meant to be a service that can help users find information about all different kinds of dog breeds. Whether that be cute pictures, learning about a particular breed or even looking to adopt. With this website, users can learn everything about dogs, and even where to obtain one.

We plan to have compatibility for our website on all devices, as it shouldn't even push the hardware limitations of cellphones.




How to install your application and all dependencies
How to run your application on a server
How to run any tests you have written for your software
The API for your server application - all GET, POST, PATCH, etc endpoints, and what they each do


                                                        How to install our application! 
                                                        
Ensure that the following files are installed on your device. Since we do not have a domain, they need to be installed locally for the HTML files to run. The files are located at https://github.com/CTrice99/INST377_Group_Project. Each file plays an important part in allowing our slew of pages to work properly.


                                                  Running the HTML files using Google Chrome

Use Google Chrome and download the CORS Plugin linked below. This will allow connections to the API's used. Then to start on our Home page, click on the Home.html file to begin. Make sure that chrome is your default browser!
https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?pli=1

                                                            How to run our tests!
We have a total of 4 tests included in our test.js file. These tests run on the about us, breeds list, favorites, and home page software. Each test has a comment indicating what it is testing and other important information. To run our tests follow these steps: 
1. Confirm that Node.js and npm are installed on your system ()
2. Install Jest and related testing libraries: npm install --save-dev jest @testing-library/dom @testing-library/jest-dom
3. Run all tests: npm test




                                                                External API

Our external API is https://dogapi.dog/api/v2. This free, keyless API gives us all of our API calls that we need to provide information on all different kinds of dog breeds, pictures and more. The API is called when searching for breeds, when loading in the home page to bring up some dynamically updating pictures of different dog breeds. the call for information of all breeds would be called as https://dogapi.dog/api/v2/breeds.


                                                                    Known Bugs
