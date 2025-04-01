import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

interface ForumPost {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'user' | 'doctor' | 'moderator';
  };
  category: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}

interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'user' | 'doctor' | 'moderator';
  };
  content: string;
  likes: number;
  timestamp: Date;
}

interface HealthArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: {
    id: string;
    name: string;
    credentials: string;
    avatar?: string;
  };
  readTime: string;
  publishDate: Date;
  image?: string;
  featured?: boolean;
}

export const communityService = {
  async getForumPosts(category?: string, tag?: string): Promise<ForumPost[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/forum/posts`, {
        params: { category, tag },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forum posts:', error);
      throw new Error('Failed to fetch forum posts');
    }
  },

  async getForumPost(postId: string): Promise<ForumPost> {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/forum/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching forum post:', error);
      throw new Error('Failed to fetch forum post');
    }
  },

  async createForumPost(post: Omit<ForumPost, 'id' | 'likes' | 'comments' | 'timestamp'>): Promise<ForumPost> {
    try {
      const response = await axios.post(`${API_BASE_URL}/community/forum/posts`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating forum post:', error);
      throw new Error('Failed to create forum post');
    }
  },

  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/forum/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Failed to fetch comments');
    }
  },

  async addComment(comment: Omit<Comment, 'id' | 'likes' | 'timestamp'>): Promise<Comment> {
    try {
      const response = await axios.post(`${API_BASE_URL}/community/forum/comments`, comment);
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw new Error('Failed to add comment');
    }
  },

  async likePost(postId: string): Promise<{ likes: number }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/community/forum/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw new Error('Failed to like post');
    }
  },

  // Type-safe mock functions for development/testing

  async getHealthArticles(category?: string, featured?: boolean): Promise<HealthArticle[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/articles`, {
        params: { category, featured },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching health articles:', error);
      throw new Error('Failed to fetch health articles');
    }
  },

  async getHealthArticle(articleId: string): Promise<HealthArticle> {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching health article:', error);
      throw new Error('Failed to fetch health article');
    }
  },

  // Mock functions for development/testing
  mockGetForumPosts(): ForumPost[] {
    return [
      {
        id: '1',
        title: 'Tips for managing seasonal allergies naturally',
        author: {
          id: 'user1',
          name: 'Sarah Johnson',
          avatar: '',
          role: 'user',
        },
        category: 'Allergies',
        content: "I've been struggling with seasonal allergies for years and wanted to share some natural remedies that have worked for me. First, local honey has been a game-changer - consuming a small amount daily has reduced my symptoms significantly. Second, regular saline nasal rinses help clear allergens. Third, I've found that certain supplements like quercetin and nettle leaf extract have anti-inflammatory properties that help with allergy symptoms. Has anyone else tried these or have other natural remedies to share?",
        likes: 24,
        comments: 8,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        tags: ['allergies', 'natural remedies', 'wellness'],
      },
      {
        id: '2',
        title: 'Understanding blood pressure readings',
        author: {
          id: 'doctor1',
          name: 'Dr. Michael Chen',
          avatar: '',
          role: 'doctor',
        },
        category: 'Heart Health',
        content: "Many patients ask me about their blood pressure readings and what the numbers mean. Let me explain the difference between systolic and diastolic pressure. The systolic (top number) represents the pressure when your heart beats, while the diastolic (bottom number) represents the pressure when your heart rests between beats. A normal reading is typically around 120/80 mmHg. Readings above 130/80 mmHg may indicate hypertension. It's important to take multiple readings over time rather than relying on a single measurement. Feel free to ask questions about your specific readings!",
        likes: 56,
        comments: 12,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        tags: ['blood pressure', 'heart health', 'medical advice'],
      },
      {
        id: '3',
        title: 'Dealing with anxiety during pandemic',
        author: {
          id: 'user2',
          name: 'Emily Wilson',
          avatar: '',
          role: 'user',
        },
        category: 'Mental Health',
        content: "The ongoing pandemic has increased my anxiety levels significantly. I wanted to share some coping strategies that have helped me. Establishing a daily routine with dedicated time for self-care has been crucial. I've also found that limiting news consumption to specific times of day helps prevent feeling overwhelmed. Regular exercise, even just a 20-minute walk, makes a huge difference in my mood. Mindfulness meditation using apps like Headspace has also been beneficial. What strategies have worked for others dealing with pandemic-related anxiety?",
        likes: 89,
        comments: 32,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        tags: ['mental health', 'anxiety', 'coping strategies'],
      },
    ];
  },

  mockGetComments(postId: string): Comment[] {
    return [
      {
        id: 'c1',
        postId,
        author: {
          id: 'user3',
          name: 'David Thompson',
          avatar: '',
          role: 'user',
        },
        content: 'Thank you for sharing this information! I\'ve been struggling with understanding my readings.',
        likes: 5,
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: 'c2',
        postId,
        author: {
          id: 'doctor2',
          name: 'Dr. Lisa Wong',
          avatar: '',
          role: 'doctor',
        },
        content: 'Great explanation. I\'d also add that home monitoring can be very valuable, but make sure your device is validated and you\'re using proper technique.',
        likes: 12,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ];
  },

  mockGetHealthArticles(): HealthArticle[] {
    return [
      {
        id: '1',
        title: 'The Science Behind Intermittent Fasting',
        category: 'Nutrition',
        summary: 'Explore the scientific evidence behind intermittent fasting and its potential benefits for metabolic health, weight management, and longevity.',
        content: 'Long article content about intermittent fasting...',
        author: {
          id: 'doctor3',
          name: 'Dr. Jessica Martinez',
          credentials: 'MD, Nutritional Science',
          avatar: '',
        },
        readTime: '8 min read',
        publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        image: '',
        featured: true,
      },
      {
        id: '2',
        title: 'Understanding Vaccine Efficacy: What the Numbers Really Mean',
        category: 'Vaccines',
        summary: 'A comprehensive guide to interpreting vaccine efficacy rates and what they mean for individual and public health protection.',
        content: 'Long article content about vaccine efficacy...',
        author: {
          id: 'doctor4',
          name: 'Dr. Robert Kim',
          credentials: 'PhD, Immunology',
          avatar: '',
        },
        readTime: '12 min read',
        publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        image: '',
        featured: false,
      },
      {
        id: '3',
        title: 'Sleep Hygiene: Building Habits for Better Rest',
        category: 'Sleep Health',
        summary: 'Learn evidence-based techniques to improve your sleep quality and establish a healthy sleep routine that works with your lifestyle.',
        content: 'Long article content about sleep hygiene...',
        author: {
          id: 'doctor5',
          name: 'Dr. Lisa Thompson',
          credentials: 'MD, Sleep Medicine',
          avatar: '',
        },
        readTime: '10 min read',
        publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
        image: '',
        featured: false,
      },
    ];
  },
};