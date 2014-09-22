#Express-CRUD
============

## Table Of Content
- [General](#general)
  - [Requirements](#requirements)
  - [Vision](#vision)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Importing The Module](#importing-the-module)
  - [Initialization](#initialization)
- [Usage](#usage)
  - [Creating a Simple CRUD Module](#creating-a-simple-crud-module)
  - [Creating a Simple Static Module](#creating-a-simple-static-module)
  - [Using Hooks](#using-hooks)
  - [Model Dependecies](#model-dependecies)
- [Options Object](#options-object)

##General
A simple to use, server side, generic module for adding CRUD module to your Express application.
This module will allow you to add a simple CRUD module for a specific model / static file without you to have to worry about common modules implementations.

###Requirements
For you to be able to use this module you need the follwing things:
- Express Application
- Static File to use / Mongoose Scheme

###Vision

##Installation
To install the module use:
mpm install <<TBD>>


##Configuration
###Importing The Module
To import the module use the following:
```
var expressCRUD = require('express-crud');
```


###Initialization
To initialize thhe module use the _init_ API
Usage:
```
/**
  @param: app - {Express Application}
**/
expressCRUD.init(app);
```
  
The Express-CRUD module will automatially add a crud method which would be described within the [Usage](#usage) section


##Usage
###Creating a Simple CRUD Module
To create a simple CRUD module you would need to have a basic mongoose scheme which it you can set with the following API on the Express Application:
```
/**
  This method is added dynamically on runtime,
  This is a helper method to create generic CRUD module
  @param: path - {String} - path which will be routed to the application
  @param: scheme - {Mongoose Model} - The Model which will be used to create the CRUD operations on
**/
app.crud(path, scheme);
```

After using this method, The followings routes would be provided for you
- /path (GET) - Get array list from the DB
- /path (POST) - Create new item in DB with specific details
- /path/:id (GET) - Get a specific item with id of :id
- /path/:id (PUT) - Update a specific item within the DB
- /path/:id (DELETE) - Delete specific item from DB

###Creating a Simple Static Module
To create a get method to a staitc data, use the same API with the following options parameter:
```
/**
  This method is added dynamically on runtime,
  This is a helper method to create static data API
  @param: path - {String} - path which will be routed to the application
  @param: data - {Object} - The object you want to open API to
  @param: options - {Object} with:
            resourceType - {String} static for exporting static data object
**/
app.crud(path, data, {resourceType : 'static'});
```

###Using Hooks


###Model Dependecies


##Options Object
