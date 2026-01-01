const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

dotenv.config();

// Sample users
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: '123456',
    bio: 'Love coding and technology! 💻',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: '123456',
    bio: 'Travel enthusiast 🌍 | Photography lover 📸',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: '123456',
    bio: 'Software Engineer | Coffee addict ☕',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah@example.com',
    password: '123456',
    bio: 'Artist & Designer 🎨',
    avatar: 'https://i.pravatar.cc/150?img=9'
  }
];

// Sample posts
const postsContent = [
  {
    content: 'Just finished an amazing project! Feeling proud 🎉',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    content: 'Beautiful sunset today! Nature is amazing 🌅',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    content: 'Coffee time! Who else needs caffeine to start the day? ☕',
    image: 'https://picsum.photos/600/400?random=3'
  },
  {
    content: 'Working on something exciting. Can\'t wait to share it with you all!',
    image: ''
  },
  {
    content: 'Weekend vibes! Time to relax and recharge 😎',
    image: 'https://picsum.photos/600/400?random=4'
  },
  {
    content: 'Just deployed my new website! Check it out and let me know what you think 🚀',
    image: ''
  },
  {
    content: 'Morning run completed! Fitness is important 🏃‍♂️',
    image: 'https://picsum.photos/600/400?random=5'
  },
  {
    content: 'Trying out a new recipe today. Wish me luck! 👨‍🍳',
    image: 'https://picsum.photos/600/400?random=6'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Make some users friends with each other
    createdUsers[0].friends.push(createdUsers[1]._id, createdUsers[2]._id);
    createdUsers[1].friends.push(createdUsers[0]._id);
    createdUsers[2].friends.push(createdUsers[0]._id, createdUsers[3]._id);
    createdUsers[3].friends.push(createdUsers[2]._id);

    await Promise.all(createdUsers.map(user => user.save()));
    console.log('Updated friendships');

    // Create posts
    const posts = [];
    for (let i = 0; i < postsContent.length; i++) {
      const userIndex = i % createdUsers.length;
      const post = new Post({
        user: createdUsers[userIndex]._id,
        content: postsContent[i].content,
        image: postsContent[i].image,
        createdAt: new Date(Date.now() - (postsContent.length - i) * 3600000) // Stagger posts by hours
      });
      
      // Add some random likes
      const numLikes = Math.floor(Math.random() * 3);
      for (let j = 0; j < numLikes; j++) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
        if (!post.likes.includes(createdUsers[randomUserIndex]._id)) {
          post.likes.push(createdUsers[randomUserIndex]._id);
        }
      }
      
      await post.save();
      posts.push(post);
    }
    console.log(`Created ${posts.length} posts`);

    // Create some comments
    const comments = [
      {
        user: createdUsers[1]._id,
        post: posts[0]._id,
        content: 'Congratulations! Well done! 👏'
      },
      {
        user: createdUsers[2]._id,
        post: posts[0]._id,
        content: 'That\'s awesome! Keep up the great work!'
      },
      {
        user: createdUsers[0]._id,
        post: posts[1]._id,
        content: 'Wow! Beautiful shot! 📸'
      },
      {
        user: createdUsers[3]._id,
        post: posts[2]._id,
        content: 'Same here! Coffee is life ☕'
      },
      {
        user: createdUsers[1]._id,
        post: posts[4]._id,
        content: 'Enjoy your weekend! 😊'
      }
    ];

    const createdComments = await Comment.create(comments);
    console.log(`Created ${createdComments.length} comments`);

    // Add comments to posts
    for (const comment of createdComments) {
      await Post.findByIdAndUpdate(comment.post, {
        $push: { comments: comment._id }
      });
    }
    console.log('Updated posts with comments');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Test Accounts:');
    console.log('==================');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
