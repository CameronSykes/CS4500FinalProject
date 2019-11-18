##  Running
 Thi program is writin in es6. It is a javascript verion writtien in 2015 it includes support for impots and exports
 
  Brwosers cannot use the import export modules in es6 unless specified by using `type="module"` in the html.
  
  In order for browsers to run it smoothly it neeeds to be transpiled into es5 syntax. 
 
 Nodejs will use babel to transpile our code into code that can run on most browsers.
 
##  Us running
Nodejs is supposed to run on your browsers
In oroder to run this program you will need to install 
+ node
+ git 


## runing this on the server
To run this on the server you will need to connect to the server.



Each of us will need a specific port number to run this from so there are no conflicts

If your port is 8089 you will run it like so 
```
ssh -L 8089:localhost:8089 team@216.21.9.147

```
This will forward all connects to your localhost:8089 to port 8089 on the server. This is required for you to see the code running

go to the phaser3-game directory run  this will start nodejs on port 8089 for you to run your code
```
npm start -- --port 8089
```
Which should output 
```
> phaser-project-template-es6@3.19.0 start /home/team/main/khalfani/CS4500FinalProject-1/phaser3-game
> webpack-dev-server --config webpack/webpack.dev.js "--port" "8089"

..[a bunch of other stuff].


ℹ ｢wdm｣: Compiled successfully.

```

Once you run this it will start a program that will compile your code. It will automatically recompile your code every time you edit it. 

However you should not run this and another command in the same terminal at the same time.

you will need to ssh into it again



## why each of us should have a user account

To be discussed later

1. configs. If we set the git user and email config globally we ill all be commiting and pushing under the same name email



