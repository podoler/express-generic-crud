#Express-CRUD
============

## Table Of Content
- [General](#general)
  - [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Importing The Module](#importing-the-module)
  - [Initialization](#initialization)
- [Usage](#usage)
  - [Creating a Simple CRUD Module](#creating-a-simple-crud-module)
  - [Creating a Simple Static Module](#creating-a-simple-static-module)
  - [Using Hooks](#using-hooks)
    - [Pre Hooks](#pre-hooks)
    - [Post Hooks](#post-hooks)
  - [Model Dependecies](#model-dependecies)
- [Additional Information](#additional-information)
  - [Options Object](#options-object)
  - [Output Object](#output-object)

##General
A simple to use, server side, generic module for adding CRUD module to your Express application.
This module will allow you to add a simple CRUD module for a specific model / static file without you to have to worry about common modules implementations.

###Requirements
For you to be able to use this module you need the follwing things:
- Express Application
- Static File to use / Mongoose Scheme

##Installation
To install the module use:
```
npm install express-generic-crud
```

##Configuration
###Importing The Module
To import the module use the following:
```
var expressCRUD = require('express-generic-crud');
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
  @returns: {Crud} - Crud object to manipulate
**/
var crud = app.crud(path, scheme);
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
Hooks are a way for the developer to intervene with the internal of the CRUD generic module,
There are two available hooks: pre-hooks and post-hooks

####Pre Hooks
Pre-Hooks are available for each operation that been defined and one can register to listen to such a hook with the following API on the Crud object (See [Creating A Simple CRUD Module](#creating-a-simple-crud-module)):
```
/**
  Registration of Pre-Hook method
  @param operation - {String} one of the followings:
                      -. list
                      -. create
                      -. read
                      -. update
                      -. delete
  @param callback - {Function} in the form of callback(context, next)
                      context - {Context} object
                      next - {Function} async next method - must be called to complete the operation
*/
crud.pre(operation, callback);
```

The Context object is overloaded with relevant details for each operation,
Here is the list of available methods for Context objects per opeartion:
- Create / Update Operation:
  ```
  /**
    Create / Update Instance Details Getter
    @returns {Object} - The details which with them the data would be created / updated
  */
  context.getDetails();
  
  /**
    Create / Updtate Instance Details Setter
    @param newDetails - {Object} set the details which with them the new instance would be created / updated
  */
  context.setDetails(newDetails);
  
  ```

For an example, to use a pre hook for create operation, use the following example:
  ```
  // Create a pre create hook
  crud.pre('create', function(context, next){
      console.log('Pre Create Hook');

      next();
  });
  ```

####Post Hooks
Post-Hooks are available for each operation that been defined and one can register to listen to such a hook with the following API on the Crud object (See [Creating A Simple CRUD Module](#creating-a-simple-crud-module)):
```
/**
  Registration of Post-Hook method
  @param operation - {String} one of the followings:
                      -. list
                      -. create
                      -. read
                      -. update
                      -. delete
  @param callback - {Function} in the form of callback(context, next)
                      context - {Context} object
                      next - {Function} async next method - must be called to complete the operation
*/
crud.post(operation, callback);
```

The Context object is overloaded with relevant details for each operation,
Here is the list of available methods for Context objects per opeartion:
- All Operations:
  ```
  /**
    Getter for the output object
    @returns {Output}
  */
  context.getOutput();
  
  /**
    Setter for a new Output object
  */
  context.setOutput(newDetails);
  ```
  
  For you to get the relevant error / result - use the getResult(), getError() getters which their documentation is found under [Output Object](#output-object)
  
For the API call:
```
  var result = context.getOutput().getResult();
```
here is a relevant result for each operation that been done
- List Operation:
  result - {Array} of instances

- Create / Read / Update / Delete Operation
  result - {Instance} single scheme instance
  
For an example of a post hook after a read operation:
```
  // Register for post read hook
  crud.post('read', function(context, next){
      console.log('Post Read');
      
      next();
  });
```
  
###Model Dependecies
This feature should be available soon.


##Additional Information
###Options Object
This is an object as a thirs parameter to the crud method, it can consist of the followings:
  - resourceType - {String} - Set the resource of which to create the CRUD module
    - mongodb - use mongodb as the resource to use the CRUD for
    - static - export static data object API
  - id - {String} - id which by it db index will be resolved upon

###Output Object
```
/**
 * Error getter
 * @returns {Error}
 */
function getError();

/**
 * Error setter
 * @param {Error} - New Error
 */
function setError(err);

/**
 * Result getter
 * @returns {*}
 */
function getResult();

/**
 * Result setter
 * @param {Object} new Result
 */
function setResult(result);

/**
 * Is Error
 * @returns {boolean}
 */
function isError();
```
