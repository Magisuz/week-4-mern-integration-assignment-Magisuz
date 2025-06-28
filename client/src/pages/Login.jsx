import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formLoading, setFormLoading] = useState(false);

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      await login(data);
      navigate('/');
    } catch (err) {
      // Error handled by context
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto card p-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="input"
            {...register('email', { required: 'Email is required' })}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="input"
            {...register('password', { required: 'Password is required' })}
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={formLoading}
        >
          {formLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login; 