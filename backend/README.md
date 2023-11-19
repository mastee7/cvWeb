# Setting Up a Node.js Environment on AWS EC2

This README outlines the steps to set up a Node.js Environment with Express.js and MongoDB on AWS EC2

## Step 1: Launch an EC2 Instance

## Step 2: Install NodeJS and NPM using NVM

1. Switch to the root user:
   ```bash
   sudo su -
   ```
2. Install NVM
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
   ```
3. Activate NVM
   ```bash
   . ~/.nvm/nvm.sh
   ```
4. Install Node.js using NVM
   ```bash
   nvm install node
   ```
5. Verify installation
   ```bash
   node -v
   npm -v
   ```
   
## Step 3: Install Git

1. Install Git
   ```bash
   sudo yum install git
   ```
2. Verify the installation
    ```bash
    git —-version
   ```
    
## Step 4: Setup Express.js

1. Create a directory for the project
   ```bash
   mkdir cvWeb && cd cvWeb
   ```
2. Initialize a new Node.js application
   ```bash
   npm init -y
   ```
3. Install Express.js
    ```bash
    npm install express --save
   ```
4. Create an app.js file for Express.js server code.

## Step 5: Install MongoDB

1. Import the public key used by the package management system:
   ```bash
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
   ```
2. Create a list file for MongoDB
   ```bash
   echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
   ```
3. Reload the local package database
   ```bash
   sudo apt-get update
   ```
4. Install the MongoDB packages
   ```bash
   sudo apt-get install -y mongodb-org
   ```
5. Start MongoDB
   ```bash
   sudo service mongod start
   ```
6. Verify that MongoDB has started
   ```bash
   sudo systemctl status mongod
   ```



   
