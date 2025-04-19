import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from './models/faqModel.js';

dotenv.config();

const seedFAQs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await FAQ.deleteMany(); // Clears old data if any

    const faqs = [
      {
        question: 'How do I reset my password?',
        answer: 'Go to your account settings and click on "Reset Password".'
      },
      {
        question: 'Where can I find my purchase history?',
        answer: 'Your purchase history is available under the "Orders" tab.'
      },
      {
        question: 'How to contact customer support?',
        answer: 'You can reach out to us via the "Help" section in the menu.'
      }
    ];

    await FAQ.insertMany(faqs);
    console.log('FAQs seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding FAQs:', err);
    process.exit(1);
  }
};

seedFAQs();
