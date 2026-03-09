<h2>1.  What is the difference between var, let, and const?</h2>

ANS. = "var" , "let" and "const" all are used to declare variables in JavaScript. By using "var", we can redeclare and reassign variables. By using "let" we can reassign the value but can't redeclare the variable. By using "const" we can't redeclare and reassign variables. "var" , "let" and "const" are hoisted but "let" and "const" can't be used before declaretion.


<h2>2. What is the spread operator (...)?</h2>

ANS. = Spread operator is used to spread/expand an array or object. It also used for make copy or duplicate of an array and used for make copy the propertys of an object.


<h2>3. What is the difference between map(), filter(), and forEach()?</h2>

ANS. = We use  map(), filter(), and forEach() for array. 
By using map() , we set an operation and it creates a new array with all elements doing the operation. 
filter() receives a condition and it gives a new array with those elements which elements are passed the condition. 
forEach() is used for looping an array. Its an easier version of traditional "for of" loop. It doesn't return anything.


<h2>4. What is an arrow function?</h2>

ANS. = Arrow function is a mordern and easier version of traditional function. In arrow function, if the function contain 1 line then we dont have to return. For example ,

      const multi = (a , b) => {
        return a * b;
      }

short form ,

         const multi = (a, b) => a * b;


<h2>5.  What are template literals?</h2>

ANS. = Template literals is a mordern ES6 feature. We use this by using backtick (``). By this method we can write multi line codes easily , which is not easy in normal way. By this method we can add dynamic values , can write dynamic codes , can do calculations  also. 