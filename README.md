# Am I Safe?

## What is this?
This is the UI side of a simple application designed to help people who are displaced in identifying whether or not they are safe to others that they know. 

It does this anonymously with no requirement for user registration of personal details, no tracking of the users location etc. All that is required is a username and password. The system also provides only a simple response to those checking the status of their loved ones

"User: <username> last said they were safe at: 2022-02-02 15:35"

You cannot send messages with this system, it is merely an update service to give people an avenue to check on the status of their loved ones. 

## Setup
To set this up you simply need to build the package and deploy the output files where needed. 
```
npm run build
```
## Configuring
You can provide a default ip address for connection to a customer deployment of the am-i-safe-microservice. This is mainly for ease of use on your users but that's also possible to enter manually through the interface.

In your build go to **src/config.js** and change the IP listed there.

## Todo
Once there are a number of am-i-safe-microservice deployments out there, a useful feature will be to replace the IP manual entry field with a dropdown of approved available servers to connect to.