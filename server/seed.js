// seed.js - Database seeding script for sample data

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

const sampleCategories = [
  {
    name: 'Technology',
    description: 'Latest tech trends and innovations',
    color: '#3B82F6'
  },
  {
    name: 'Programming',
    description: 'Coding tutorials and development tips',
    color: '#10B981'
  },
  {
    name: 'Web Development',
    description: 'Frontend and backend development',
    color: '#F59E0B'
  },
  {
    name: 'MongoDB',
    description: 'Database and data management',
    color: '#8B5CF6'
  },
  {
    name: 'React',
    description: 'React.js tutorials and best practices',
    color: '#06B6D4'
  }
];

const samplePosts = [
  {
    title: 'Getting Started with MERN Stack',
    content: `The MERN stack is a popular web development stack that consists of MongoDB, Express.js, React.js, and Node.js. It's a full-stack JavaScript solution that allows developers to build web applications using only JavaScript.

## What is MERN Stack?

- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents
- **Express.js**: A web application framework for Node.js
- **React.js**: A JavaScript library for building user interfaces
- **Node.js**: A JavaScript runtime environment

## Why Choose MERN?

1. **JavaScript Everywhere**: Use the same language on frontend and backend
2. **Fast Development**: Rich ecosystem and community support
3. **Scalable**: Can handle large applications
4. **Flexible**: Easy to modify and extend

This blog post will guide you through setting up your first MERN stack application.`,
    tags: ['mern', 'javascript', 'web-development', 'tutorial'],
    isPublished: true
  },
  {
    title: 'Understanding MongoDB Aggregation',
    content: `MongoDB aggregation is a powerful feature that allows you to process documents and return computed results. It's similar to SQL's GROUP BY clause but much more flexible.

## Aggregation Pipeline

The aggregation pipeline consists of stages, where each stage processes the documents and passes the results to the next stage.

### Common Stages:

1. **$match**: Filters documents
2. **$group**: Groups documents by a specified expression
3. **$sort**: Sorts documents
4. **$project**: Reshapes documents
5. **$limit**: Limits the number of documents

## Example

\`\`\`javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
\`\`\`

This example finds all active documents, groups them by category, sums the amounts, and sorts by total in descending order.`,
    tags: ['mongodb', 'database', 'aggregation', 'nosql'],
    isPublished: true
  },
  {
    title: 'React Hooks Best Practices',
    content: `React Hooks have revolutionized how we write React components. They allow us to use state and other React features in functional components.

## Key Hooks

### useState
Manages component state:
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect
Handles side effects:
\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

### useContext
Shares data between components:
\`\`\`javascript
const theme = useContext(ThemeContext);
\`\`\`

## Best Practices

1. **Always call hooks at the top level**
2. **Don't call hooks inside loops, conditions, or nested functions**
3. **Use the dependency array in useEffect**
4. **Create custom hooks for reusable logic**

## Custom Hooks

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\``,
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    isPublished: true
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create categories one by one to ensure slug generation
    const createdCategories = [];
    for (const categoryData of sampleCategories) {
      const category = new Category(categoryData);
      await category.save();
      createdCategories.push(category);
    }
    console.log(`Created ${createdCategories.length} categories`);

    // Create a default user for posts
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

    // Create posts with categories
    const postsWithCategories = samplePosts.map((post, index) => ({
      ...post,
      author: defaultUser._id,
      category: createdCategories[index % createdCategories.length]._id
    }));

    const createdPosts = await Post.create(postsWithCategories);
    console.log(`Created ${createdPosts.length} posts`);

    console.log('Database seeding completed successfully!');
    console.log('\nSample data created:');
    console.log('- Categories:', createdCategories.map(c => c.name).join(', '));
    console.log('- Posts:', createdPosts.map(p => p.title).join(', '));
    console.log('- Default user: admin@example.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase(); 