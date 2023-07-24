const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
  title: "Two states",
  description: "Given an array , return the maximum of the array?",
  testCases: [{
      input: "[1,2,3,4,5]",
      output: "5"
  }]
}];

[{
  title: "Palindrome",
  description: "Check if given number is palindrome or not?",
  testCases: [{
      input: "[4,5,6,5,4]",
      output: "Yes"
  }]
}];




const SUBMISSION = [

]

// SIGNUP

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
const { email, password} = req.body;

if (!email || !password) {
  return res.status(400).send('Email and password is required');
}

// Check if user already exists with the same email
const existingUser = USERS.find(user => user.email === email);
if (existingUser) {
  return res.status(409).send('Email already exists');
} 

// Store email and password in USERS array
USERS.push({ email, password });

  // return back 200 status code to the client
  res.status(200).send('Successfully Done!')
})


// LOGIN

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  const { email, password} = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password is required');
  }

  // Find the user with the given email
  const user = USERS.find(user => user.email === email);

  // Check if the user with the given email exists in the USERS array
 if (!user) {
  return res.status(401).send('Invalid user credentials.');
 }
  // Also ensure that the password is the same
  if (user.password === password) {
    const token = 'random_token_string';
 

  // If the password is the same, return back 200 status code to the client
  return res.status(200).json({ message: 'Login successful', token: token });
}
  // If the password is not the same, return back 401 status code to the client
  else{
    return res.status(401).send('Invalid login credentials');
  }
});



app.get('/questions', function(req, res) {
  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
});

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.json(SUBMISSION);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem
   const { problem } = req.body;

   if(!problem) {
    return res.status(400).send('Problem field need to request');
   }
   // randomly accept or reject the solution
   const random = Math.random() < 0.5 ? 0 :1;
   const outcome = random === 0 ? "Reject" : "Accept";
   // Store the submission in the SUBMISSION array above
   SUBMISSION.push({ problem, outcome});
  res.status(200).json({
    message: "Submission received",
    outcome: outcome
  })
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})