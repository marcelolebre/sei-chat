# sei-chat
  
---
## Setting up
### 1. installing dependencies
* npm - [https://nodejs.org/en/](https://nodejs.org/en/)

### 2. Installing sails

``` sudo npm -g install sails ```

official documentation - [http://sailsjs.org/get-started](http://sailsjs.org/get-started)

### 3. Create a Firebase Account
We are storing all important stuff here.

[https://www.firebase.com](https://www.firebase.com)

---


## Config & Run


### 1. Configure Firebase
1. Login 

2. Create a new app 

3. Copy your new firebase app url such as :   

	```
	https://<new-app-name>.firebaseio.com/ 
	```
4. In the following file: ``` <root-folder>/config/firebaseConfig.js```
	1. Replace with the following url with the firebase app url copied in ***step 3***:
	 ``` var appUrl = 'https://<your-app>.firebaseio.com'; ```

### 2. Run 

``` sails lift ```

Your app is now available at ```http://localhost:1337```

