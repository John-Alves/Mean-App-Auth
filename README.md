# Simple MEAN (MongoDB, Express and Angular) application.

## Notes
1. MongoDB connection error.
   
<pre>
(node:5876) UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:27017
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1126:14)
(node:5876) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:5876) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
</pre>
Solution:
<pre>
# remove .lock file
sudo rm /var/lib/mongodb/mongod.lock 

# repair the mongodb
mongod --repair

# start the mongod server
sudo service mongod start 

# start the mongo client
mongo
</pre>
https://stackoverflow.com/questions/13312358/mongo-couldnt-connect-to-server-127-0-0-127017