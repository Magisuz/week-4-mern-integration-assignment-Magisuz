import { Link } from 'react-router-dom';
import { Calendar, Eye, MessageCircle, User, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostContext';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const { deletePost } = usePosts();

  const canEdit = user && (
    user.id === post.author?._id?.toString() || 
    user.id === post.author?._id || 
    user.role === 'admin'
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id);
      } catch (error) {
        // Error handled by context
      }
    }
  };

  return (
    <article className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Featured Image */}
      {post.featuredImage && post.featuredImage.trim() !== '' && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {post.category && (
          <div className="mb-3">
            <span
              className="inline-block px-3 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: `${post.category.color}20`,
                color: post.category.color 
              }}
            >
              {post.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link to={`/posts/${post.slug}`} className="hover:text-primary-600">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Author */}
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author?.name || 'Anonymous'}</span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Views */}
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {canEdit && (
          <div className="mt-4 flex items-center space-x-2 pt-4 border-t border-gray-100">
            <Link
              to={`/edit-post/${post.slug}`}
              className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard; 