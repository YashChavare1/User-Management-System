# Frontend Web Application

## Technology Used:
  - React.JS
  - CSS
  - Axios (Used for API Requests)
  - Javascript
  - react-router-dom (Used for Navigation into Web-Application)

## Features

- **User Authentication**
  - Sign-up / Sign-in Form
- **User Management**
  - User Listing
  - Profile Updation
  - Change Password
  - Delete Profile
- **Filters**
  - User ID Sorting
  - Date of Birth Sorting
- **Responsive Design**
- **Custom Hooks**

## Backend API Endpoints

- **User Registration**: `POST /user/sign-up`
- **User Login**: `POST /user/sign-in`
- **Get Users**: `GET /user/get`
- **Get Logged In User**: `GET /user/get-user`
- **Change Password**: `PUT /user/change-password`
- **Update User Details**: `PUT /user/update`
- **Delete User**: `DELETE /user/delete`

## Backend Features

- Middleware for Authorization
- Controller for Functionality
- Model for Database Management using Sequelize
- Routes for API Routing
- `.env` for Secure Credentials Storage

## Requirements

- Node.js

## Setup Guide

### Clone the Repository

1. Clone the repository using Git:   `git clone <repository-url>`
2. Navigate to **backend** folder and run command: npm install
3. Navigate to **frontend** folder and run command: npm install

## Database Creation
  - Create database into your SQL database and add its detail into env files
  - During this development i have used `MySQL Workbench 8.0 CE`

## Create .env files

1. Into `backend` folder create `.env` folder and add following content (Note: do not add space after "=")
   - DB_HOST=
   - DB_USER=
   - DB_PASSWORD=
   - DB_NAME=
   - JWT_SECRET_KEY=
   - PORT=8080

2. Into `frontend` folder create `.env` folder and add following content
   - REACT_APP_BASE_URL=http://localhost:8080

