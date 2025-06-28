import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { postService, categoryService } from '../services/api';
import toast from 'react-hot-toast';

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchPosts = useCallback(async (page = 1, limit = 10, category = null, search = null) => {
    setLoading(true);
    try {
      const response = await postService.getAllPosts(page, limit, category, search);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createPost = useCallback(async (postData) => {
    try {
      const response = await postService.createPost(postData);
      await fetchPosts(1, 10);
      toast.success('Post created successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create post');
      throw error;
    }
  }, [fetchPosts]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      const response = await postService.updatePost(id, postData);
      await fetchPosts(1, 10);
      toast.success('Post updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update post');
      throw error;
    }
  }, [fetchPosts]);

  const deletePost = useCallback(async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete post');
      throw error;
    }
  }, []);

  const addComment = useCallback(async (postId, commentData) => {
    try {
      const response = await postService.addComment(postId, commentData);
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, response.data]
          };
        }
        return post;
      }));
      toast.success('Comment added successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add comment');
      throw error;
    }
  }, []);

  const searchPosts = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await postService.searchPosts(query);
      setPosts(response.data);
      setPagination(response.pagination || { page: 1, limit: 10, total: response.data.length, pages: 1 });
    } catch (error) {
      toast.error('Failed to search posts');
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    posts,
    categories,
    loading,
    pagination,
    fetchPosts,
    fetchCategories,
    createPost,
    updatePost,
    deletePost,
    addComment,
    searchPosts,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}; 