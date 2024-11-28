# Backend API Documentation

This documentation provides an overview of the backend API endpoints available for user and captain management. The API allows for user registration, login, profile retrieval, and logout functionality.

## Table of Contents
- [User  Endpoints](#user-endpoints)
  - [/users/register](#usersregister)
  - [/users/login](#userslogin)
  - [/users/profile](#usersprofile)
  - [/users/logout](#userslogout)
- [Captain Endpoints](#captain-endpoints)
  - [/captains/register](#captainsregister)
  - [/captains/login](#captainslogin)
  - [/captains/profile](#captainsprofile)
  - [/captains/logout](#captainslogout)

## User Endpoints

### `/users/register`
**Description**  
Registers a new user by creating a user account with the provided information.

**HTTP Method**  
`POST`

**Request Body**  
The request body should be in JSON format and include the following fields:
```json
{
  "fullname": {
    "firstname": "string, required",
    "lastname": "string, optional"
  },
  "email": "string, required",
  "password": "string, required"
}

