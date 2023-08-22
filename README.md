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
</ol>

<h2>Usage</h2>
<p>To start the server using Nodemon, run the following command:</p>
<pre><code>npm start</code></pre>
<p>The server will start and listen for incoming requests at the specified port.</p>

<h2>example .env file</h2>
<p> 
<pre><code>
API_URL = /api/v1
CONNECTION_STRING = (mongodb connection)
</code></pre>
</p>

<h2>E-commerce Backend Features</h2>

<h3>1. Product Management</h3>
-<p>Add, update, and delete products.</p>
-<p>Include product details like name, description, price, and images.</p>

<h3>2. Category Management</h3>
-<p>Create, modify, and delete product categories.</p>
-<p>Assign products to specific categories.</p>

<h3>3. User Management</h3>
-<p>Manage user accounts, including registration and login.</p>
-<p>Admin can view and edit user details.</p>

<h3>4. Order Processing</h3>
-<p>Handle order creation and tracking.</p>
-<p>Admin can view and manage orders.</p>

<h3>5. Authentication and Security</h3>
-<p>Implement user authentication and authorization.</p>
-<p>Protect sensitive data and user accounts.</p>

