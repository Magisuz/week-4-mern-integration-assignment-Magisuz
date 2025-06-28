import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { Calendar, Eye, MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await postService.getPost(id);
        setPost(response.data);
      } catch (error) {
        toast.error('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const onSubmitComment = async (data) => {
    setCommentLoading(true);
    try {
      const response = await postService.addComment(post._id, { content: data.content });
      setPost((prev) => ({ ...prev, comments: [...prev.comments, response.data] }));
      reset();
      toast.success('Comment added!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="text-center py-12 text-gray-500">Post not found.</div>;

  return (
    <article className="max-w-3xl mx-auto card p-8">
      {/* Featured Image */}
      {post.featuredImage && post.featuredImage.trim() !== '' && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
      )}

      {/* Category */}
      {post.category && (
        <span
          className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
          style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
        >
          {post.category.name}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4" />
          <span>{post.author?.name || 'Anonymous'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="h-4 w-4" />
          <span>{post.viewCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments?.length || 0}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">#{tag}</span>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Comments ({post.comments?.length || 0})
        </h2>
        <div className="space-y-6 mb-8">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-700">{comment.user?.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-400">{format(new Date(comment.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                <p className="text-gray-800 ml-6">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No comments yet.</div>
          )}
        </div>

        {/* Add Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmit(onSubmitComment)} className="space-y-3">
            <textarea
              className="input min-h-[80px] resize-y"
              placeholder="Write a comment..."
              {...register('content', { required: 'Comment cannot be empty' })}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={commentLoading}
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div className="text-gray-500">Login to add a comment.</div>
        )}
      </section>
    </article>
  );
};

export default PostDetail; 