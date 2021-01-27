## API's for Collage Managemt Portal

### All API's  
    http://localhost:9000/student-login (For student login)  
    http://localhost:9000/teacher-login (For teacher login)  
    http://localhost:9000/create-student (For register a student)  
    http://localhost:9000/create-teacher (for register a teacher)  
    http://localhost:9000/get-assignment (For get assignments added by the teacher)  
    http://localhost:9000/get-submit-assignment (For get the assignment submitted by student)  
    http://localhost:9000/add-assignments (For add the assignment by the teacher)  
    http://localhost:9000/get-assignments (For get all the assignmnets given by the teacher)  
    http://localhost:9000/submit-assignments (For submit the assignment by student given by the teacher)  
    http://localhost:9000/submit-grade (For submit grade by teacher for a assignment)  
    http://localhost:9000/edit-student (For edit the student's detail like name, password)  
    http://localhost:9000/edit-teacher (For edit the teacher's detail like name, password)    

### Folder Structure
    models
        add_assignment.js
        student.js
        submitted_assignment.js
        teacher.js
    public
        files
    routes
        index.js
    app.js
