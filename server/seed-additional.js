// seed-additional.js - Add more categories and posts to existing database

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Post = require('./models/Post');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const additionalCategories = [
  {
    name: 'Node.js',
    description: 'Server-side JavaScript development',
    color: '#339933'
  },
  {
    name: 'Express.js',
    description: 'Web application framework for Node.js',
    color: '#000000'
  },
  {
    name: 'JavaScript',
    description: 'Programming language fundamentals and advanced concepts',
    color: '#F7DF1E'
  },
  {
    name: 'CSS',
    description: 'Styling and design techniques',
    color: '#1572B6'
  },
  {
    name: 'HTML',
    description: 'Web markup and structure',
    color: '#E34F26'
  },
  {
    name: 'API Development',
    description: 'Building and consuming RESTful APIs',
    color: '#FF6B6B'
  },
  {
    name: 'Database Design',
    description: 'Database modeling and optimization',
    color: '#4ECDC4'
  },
  {
    name: 'DevOps',
    description: 'Development operations and deployment',
    color: '#45B7D1'
  }
];

const additionalPosts = [
  {
    title: 'Building RESTful APIs with Express.js',
    content: `Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Setting Up Express.js

First, install Express.js:
\`\`\`bash
npm install express
\`\`\`

## Basic Server Setup

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express API' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## RESTful Routes

\`\`\`javascript
// GET all items
app.get('/api/items', (req, res) => {
  // Return all items
});

// GET single item
app.get('/api/items/:id', (req, res) => {
  // Return specific item
});

// POST new item
app.post('/api/items', (req, res) => {
  // Create new item
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  // Update item
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  // Delete item
});
\`\`\`

## Middleware

Express middleware functions have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

\`\`\`javascript
// Custom middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};

app.use(logger);
\`\`\`

This guide covers the basics of building RESTful APIs with Express.js.`,
    tags: ['express', 'api', 'nodejs', 'rest', 'backend'],
    isPublished: true
  },
  {
    title: 'Modern JavaScript ES6+ Features',
    content: `JavaScript has evolved significantly with ES6 (ECMAScript 2015) and subsequent versions. Let's explore some key features that make JavaScript more powerful and expressive.

## Arrow Functions

Arrow functions provide a concise syntax for writing function expressions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With multiple statements
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
\`\`\`

## Destructuring

Extract values from objects and arrays:

\`\`\`javascript
// Object destructuring
const user = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;

// Function parameters
const printUser = ({ name, age }) => {
  console.log(\`\${name} is \${age} years old\`);
};
\`\`\`

## Template Literals

String interpolation with backticks:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${title}</h1>
    <p>\${content}</p>
  </div>
\`;
\`\`\`

## Spread and Rest Operators

\`\`\`javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { name: 'John' };
const obj2 = { ...obj1, age: 30 }; // { name: 'John', age: 30 }

// Rest operator
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};
\`\`\`

## Async/Await

Modern way to handle asynchronous operations:

\`\`\`javascript
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}
\`\`\`

These features make JavaScript more readable and maintainable.`,
    tags: ['javascript', 'es6', 'modern-js', 'programming'],
    isPublished: true
  },
  {
    title: 'CSS Grid Layout Complete Guide',
    content: `CSS Grid Layout is a powerful two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 20px;
}
\`\`\`

## Grid Template Areas

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 80px 1fr 80px;
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

## Grid Lines and Positioning

\`\`\`css
.item {
  grid-column: 1 / 3; /* Start at line 1, end at line 3 */
  grid-row: 2 / 4;    /* Start at line 2, end at line 4 */
}

/* Using span */
.item {
  grid-column: 1 / span 2; /* Start at line 1, span 2 columns */
}
\`\`\`

## Grid Alignment

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;    /* Horizontal alignment */
  align-items: center;      /* Vertical alignment */
  justify-content: center;  /* Grid container alignment */
  align-content: center;
}
\`\`\`

## Practical Example: Card Layout

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}
\`\`\`

CSS Grid is perfect for creating complex layouts that were previously difficult or impossible with CSS alone.`,
    tags: ['css', 'grid', 'layout', 'frontend', 'design'],
    isPublished: true
  },
  {
    title: 'MongoDB CRUD Operations with Mongoose',
    content: `Mongoose is an elegant MongoDB object modeling for Node.js. It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks.

## Setting Up Mongoose

\`\`\`javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
\`\`\`

## Creating a Schema

\`\`\`javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
\`\`\`

## Create (C)

\`\`\`javascript
// Create a single document
const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

await user.save();

// Create multiple documents
const users = await User.create([
  { name: 'Alice', email: 'alice@example.com', age: 25 },
  { name: 'Bob', email: 'bob@example.com', age: 35 }
]);
\`\`\`

## Read (R)

\`\`\`javascript
// Find all documents
const allUsers = await User.find();

// Find with conditions
const adults = await User.find({ age: { $gte: 18 } });

// Find one document
const user = await User.findOne({ email: 'john@example.com' });

// Find by ID
const userById = await User.findById(userId);

// Select specific fields
const users = await User.find().select('name email -_id');

// Sort results
const sortedUsers = await User.find().sort({ createdAt: -1 });

// Limit results
const recentUsers = await User.find().limit(10);
\`\`\`

## Update (U)

\`\`\`javascript
// Update one document
await User.updateOne(
  { email: 'john@example.com' },
  { age: 31 }
);

// Update multiple documents
await User.updateMany(
  { age: { $lt: 18 } },
  { isMinor: true }
);

// Find and update
const updatedUser = await User.findOneAndUpdate(
  { email: 'john@example.com' },
  { age: 31 },
  { new: true } // Return updated document
);

// Update by ID
await User.findByIdAndUpdate(userId, { age: 31 });
\`\`\`

## Delete (D)

\`\`\`javascript
// Delete one document
await User.deleteOne({ email: 'john@example.com' });

// Delete multiple documents
await User.deleteMany({ age: { $lt: 18 } });

// Find and delete
const deletedUser = await User.findOneAndDelete({ email: 'john@example.com' });

// Delete by ID
await User.findByIdAndDelete(userId);
\`\`\`

## Advanced Queries

\`\`\`javascript
// Aggregation
const result = await User.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: null, averageAge: { $avg: '$age' } } }
]);

// Population (joins)
const posts = await Post.find()
  .populate('author', 'name email')
  .populate('category', 'name');
\`\`\`

Mongoose makes MongoDB operations intuitive and provides powerful features for data modeling.`,
    tags: ['mongodb', 'mongoose', 'database', 'nodejs', 'crud'],
    isPublished: true
  },
  {
    title: 'React State Management with Context API',
    content: `The React Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's perfect for sharing data that is considered "global" for a tree of React components.

## Creating Context

\`\`\`javascript
// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
\`\`\`

## Using Context in Components

\`\`\`javascript
// App.js
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </UserProvider>
  );
}

// Header.js
import { useUser } from './contexts/UserContext';

function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      <h1>My App</h1>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}

// LoginForm.js
import { useUser } from './contexts/UserContext';

function LoginForm() {
  const { login, loading } = useUser();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Redirect or show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials,
          email: e.target.value
        })}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
\`\`\`

## Multiple Contexts

\`\`\`javascript
// ThemeContext.js
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// App.js with multiple providers
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PostProvider>
          <div className="App">
            <Header />
            <Main />
            <Footer />
          </div>
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
\`\`\`

## Custom Hook for Multiple Contexts

\`\`\`javascript
// useApp.js
import { useUser } from './contexts/UserContext';
import { useTheme } from './contexts/ThemeContext';

export const useApp = () => {
  const user = useUser();
  const theme = useTheme();
  
  return {
    ...user,
    ...theme
  };
};
\`\`\`

The Context API is perfect for sharing state across components without prop drilling.`,
    tags: ['react', 'context', 'state-management', 'hooks', 'frontend'],
    isPublished: true
  }
];

async function addMoreData() {
  try {
    console.log('Adding more categories and posts...');

    // Get existing user or create one
    let defaultUser = await User.findOne({ email: 'admin@example.com' });
    if (!defaultUser) {
      defaultUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('Created default user');
    }

    // Add new categories
    const createdCategories = [];
    for (const categoryData of additionalCategories) {
      // Check if category already exists
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        createdCategories.push(category);
        console.log(`Created category: ${category.name}`);
      } else {
        createdCategories.push(existingCategory);
        console.log(`Category already exists: ${existingCategory.name}`);
      }
    }

    // Add new posts
    const createdPosts = [];
    for (const postData of additionalPosts) {
      // Check if post already exists
      const existingPost = await Post.findOne({ title: postData.title });
      if (!existingPost) {
        const post = new Post({
          ...postData,
          author: defaultUser._id,
          category: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id
        });
        await post.save();
        createdPosts.push(post);
        console.log(`Created post: ${post.title}`);
      } else {
        console.log(`Post already exists: ${existingPost.title}`);
      }
    }

    console.log('\nAdditional data added successfully!');
    console.log(`- New categories: ${createdCategories.length}`);
    console.log(`- New posts: ${createdPosts.length}`);

  } catch (error) {
    console.error('Error adding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addMoreData(); 