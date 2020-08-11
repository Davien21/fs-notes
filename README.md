## A NOTES APP  
### An implementation of a notes app using a note taking api  

This api gives access to the file system using the **fs** module of nodejs.
This API will allow you to:  

1. View a list of all existing note files. 
2. Read the content of note files.  
3. Create new note files.
4. Update existing note files.   
5. Delete a note file.   
6. Rename a note file.   

#### Things to consider:
1. Review the **NoteClass.js** file to see the Class described and how it's methods work.  

#### How to use:  
1. Open the **app.js** file and enter the **node app.js** command  
2. Open the index.html file in your browser  to get an interactive UI that allows you to take and manage notes
 
#### Testing the API:  
The Following require you pass in the specified parameters in an **application/json** content-type:
 - POST request to the **"/create"** route by passing in the **name** and **content** of the new file.  
 - POST request to the **"/delete"** route by passing in the **name** of the file you wish to delete.    
 - POST request to the **"/update"** route by passing in the **name** and **content** of the file you wish to update.    
 - POST request to the **"/rename"** route by passing in the **name** and **new_name** of the file you wish to rename.   

#### There are no dependencies and testing can easily be done via **Postman**.

Made with love from an intern at **WeJapa**
