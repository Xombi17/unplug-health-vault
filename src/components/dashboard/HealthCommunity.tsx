import React, { useState } from 'react';
import { MessageSquare, Users, BookOpen, Search, ThumbsUp, MessageCircle, Clock, User, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';

interface ForumPost {
  id: string;
  title: string;
  author: {
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

interface HealthArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  author: {
    name: string;
    credentials: string;
    avatar?: string;
  };
  readTime: string;
  publishDate: Date;
  image?: string;
  featured?: boolean;
}

const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Tips for managing seasonal allergies naturally',
    author: {
      name: 'Sarah Johnson',
      avatar: '',
      role: 'user',
    },
    category: 'Allergies',
    content: "I've been struggling with seasonal allergies for years and wanted to share some natural remedies that have worked for me...",
    likes: 24,
    comments: 8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    tags: ['allergies', 'natural remedies', 'wellness'],
  },
  {
    id: '2',
    title: 'Understanding blood pressure readings',
    author: {
      name: 'Dr. Michael Chen',
      avatar: '',
      role: 'doctor',
    },
    category: 'Heart Health',
    content: "Many patients ask me about their blood pressure readings and what the numbers mean. Let me explain the difference between systolic and diastolic pressure...",
    likes: 56,
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tags: ['blood pressure', 'heart health', 'medical advice'],
  },
  {
    id: '3',
    title: 'Dealing with anxiety during pandemic',
    author: {
      name: 'Emily Wilson',
      avatar: '',
      role: 'user',
    },
    category: 'Mental Health',
    content: "The ongoing pandemic has increased my anxiety levels significantly. I wanted to share some coping strategies that have helped me...",
    likes: 89,
    comments: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    tags: ['mental health', 'anxiety', 'coping strategies'],
  },
];

const mockHealthArticles: HealthArticle[] = [
  {
    id: '1',
    title: 'The Science Behind Intermittent Fasting',
    category: 'Nutrition',
    summary: 'Explore the scientific evidence behind intermittent fasting and its potential benefits for metabolic health, weight management, and longevity.',
    author: {
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
    author: {
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
    author: {
      name: 'Dr. Lisa Thompson',
      credentials: 'MD, Sleep Medicine',
      avatar: '',
    },
    readTime: '10 min read',
    publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    image: '',
    featured: false,
  },
  {
    id: '4',
    title: 'Managing Chronic Pain: Beyond Medication',
    category: 'Pain Management',
    summary: 'Explore complementary approaches to pain management including physical therapy, mindfulness, and lifestyle modifications.',
    author: {
      name: 'Dr. James Wilson',
      credentials: 'MD, Pain Management',
      avatar: '',
    },
    readTime: '15 min read',
    publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    image: '',
    featured: false,
  },
];

const HealthCommunity = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchQuery, setSearchQuery] = useState('');

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 604800)} weeks ago`;
  };

  const getRoleBadge = (role: ForumPost['author']['role']) => {
    switch (role) {
      case 'doctor':
        return <Badge className="bg-blue-900/30 text-blue-400">Verified Doctor</Badge>;
      case 'moderator':
        return <Badge className="bg-purple-900/30 text-purple-400">Moderator</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Health Community</h2>
          <p className="text-muted-foreground">
            Connect with others and access expert health information
          </p>
        </div>
      </div>

      <GlassMorphismCard className="p-6">
        <Tabs defaultValue="forum" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="forum" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion Forum
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Health Articles
              </TabsTrigger>
            </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={`Search ${activeTab === 'forum' ? 'discussions' : 'articles'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="forum" className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                All Topics
              </Badge>
              <Badge variant="outline">
                Mental Health
              </Badge>
              <Badge variant="outline">
                Nutrition
              </Badge>
              <Badge variant="outline">
                Fitness
              </Badge>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockForumPosts.map((post) => (
              <GlassMorphismCard key={post.id} className="hover:scale-[1.01] transition-all cursor-pointer">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{post.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm">{post.author.name}</span>
                            {getRoleBadge(post.author.role)}
                            <Badge variant="outline" className="bg-muted">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs bg-primary/5">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassMorphismCard>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              Load More Discussions
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-6 mt-2">
          {/* Featured Article */}
          {mockHealthArticles.filter(article => article.featured).map((article) => (
            <GlassMorphismCard key={article.id} className="overflow-hidden hover:scale-[1.01] transition-all cursor-pointer">
              <div className="md:flex">
                <div className="md:w-1/3 bg-muted h-48 md:h-auto">
                  {/* Placeholder for article image */}
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <Badge className="mb-2 bg-primary/10 text-primary">
                    Featured
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{article.author.name}</p>
                        <p className="text-xs text-muted-foreground">{article.author.credentials}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                      <span>{formatTimeAgo(article.publishDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassMorphismCard>
          ))}
          
          <h3 className="text-lg font-medium">Recent Articles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHealthArticles.filter(article => !article.featured).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer h-full flex flex-col">
                <div className="h-40 bg-muted">
                  {/* Placeholder for article image */}
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <BookOpen className="h-8 w-8 text-primary/40" />
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <Badge variant="outline" className="mb-2 w-fit">
                    {article.category}
                  </Badge>
                  <h3 className="font-medium mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              View All Articles
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      </GlassMorphismCard>
    </div>
  );
};

export default HealthCommunity;