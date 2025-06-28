import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePosts } from '../contexts/PostContext';
import { postService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();
  const { categories, createPost, updatePost } = usePosts();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      content: '',
      category: '',
      tags: '',
      featuredImage: null,
    },
  });

  // If editing, fetch post data
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      postService.getPost(slug)
        .then(res => {
          const post = res.data;
          setValue('title', post.title);
          setValue('content', post.content);
          setValue('category', post.category?._id || '');
          setValue('tags', post.tags ? post.tags.join(', ') : '');
          setImagePreview(post.featuredImage ? `http://localhost:5000/uploads/${post.featuredImage}` : null);
        })
        .catch(() => toast.error('Failed to load post'))
        .finally(() => setLoading(false));
    }
  }, [slug, isEdit, setValue]);

  // Handle image preview
  const featuredImage = watch('featuredImage');
  useEffect(() => {
    if (featuredImage && featuredImage[0]) {
      const file = featuredImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [featuredImage]);

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      // Prepare form data for image upload
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('category', data.category);
      formData.append('tags', data.tags);
      if (data.featuredImage && data.featuredImage[0]) {
        formData.append('image', data.featuredImage[0]);
      }

      let post;
      if (isEdit) {
        post = await postService.updatePost(slug, formData);
        toast.success('Post updated!');
        navigate(`/posts/${post.data.slug}`);
      } else {
        post = await postService.createPost(formData);
        toast.success('Post created!');
        // Navigate to home page to see the new post in the list
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response?.data?.error || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto card p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="input"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="input min-h-[120px] resize-y"
            {...register('content', { required: 'Content is required' })}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="input"
            {...register('category', { required: 'Category is required' })}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags <span className="text-gray-400">(comma separated)</span></label>
          <input
            type="text"
            className="input"
            {...register('tags')}
            placeholder="e.g. react, mern, webdev"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="input"
            {...register('featuredImage')}
          />
          {imagePreview && imagePreview.trim() !== '' && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded object-cover" />
          )}
        </div>
        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
};

export default CreatePost; 