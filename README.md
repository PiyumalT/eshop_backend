<h1>Eshop Backend</h1>
<p>Eshop Backend is a backend application for an e-commerce website, built using Node.js and several essential modules. It provides general features required for the smooth functioning of an e-commerce platform's backend.</p>

<h2>Modules / Dependencies used</h2>
<ul>
    <li><strong>Nodemon:</strong> Nodemon is used to automatically restart the server whenever changes are made to the source code, making the development process more efficient.</li>
    <li><strong>Express:</strong> Express is a minimal and flexible Node.js web application framework that simplifies the creation of robust APIs and web applications.</li>
    <li><strong>dotenv:</strong> The dotenv module is employed to load environment variables from a .env file, allowing for secure configuration of sensitive data.</li>
    <li><strong>body-parser:</strong> Body-parser is middleware that parses incoming request bodies in a middleware before your handlers, and makes it available under the req.body property.</li>
    <li><strong>morgan:</strong> Morgan is a HTTP request logger middleware for Node.js, used to log HTTP requests and related information, which is helpful for debugging and monitoring.</li>
    <li><strong>mongoose:</strong> Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It simplifies the interaction with MongoDB databases by providing a schema-based solution for modeling application data.</li>
    <li><strong>cors:</strong> Cors (Cross-Origin Resource Sharing) middleware is used to enable cross-origin requests, allowing your API to be accessed by clients running on different domains.</li>
    <li><strong>bcryptjs:</strong> Bcryptjs is used for securely hashing passwords in Node.js applications.</li>
    <li><strong>jsonwebtoken:</strong> Jsonwebtoken generates and manages JSON Web Tokens for authentication in Node.js applications.</li>
    <li><strong>multer:</strong> Multer is middleware that simplifies handling file uploads in Node.js applications.</li>

    
</ul>

<h2>Installation</h2>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/PiyumalT/eshop_backend.git</code></pre>
        <pre><code>cd Eshop-Backend</code></pre>
    </li>
    <li>Install the required dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file in the root directory and configure your environment variables. You can use the provided below as a template.</li>
    <p> 
    <pre><code>
    API_URL = /api/v1
    CONNECTION_STRING = (mongodb connection)
    </code></pre>
    </p>
</ol>

<h2>Usage</h2>
<p>To start the server using Nodemon, run the following command:</p>
<pre><code>npm start</code></pre>
<p>The server will start and listen for incoming requests at the specified port.</p>

<h2>example .env file</h2>


<h2>E-commerce Backend Features</h2>

<h3>1. Product Management</h3>

    Add, update, and delete products.
    Include product details like name, description, price, and images.

<h3>2. Category Management</h3>

    Create, modify, and delete product categories.
    Assign products to specific categories.

<h3>3. User Management</h3>

    Manage user accounts, including registration and login.
    Admin can view and edit user details.

<h3>4. Order Processing</h3>

    Handle order creation and tracking.
    Admin can view and manage orders.

<h3>5. Authentication and Security</h3>

    Implement user authentication and authorization.
    Protect sensitive data and user accounts.

<h2>Enjoy!</h2>
