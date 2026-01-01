import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white lg:bg-[#f0f2f5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        {/* Logo for mobile */}
        <div className="lg:hidden text-center mb-6">
          <h1 className="text-[#1877f2] text-5xl font-bold">facebook</h1>
        </div>

        {/* Modal */}
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto relative">
          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors z-10"
          >
            <svg viewBox="0 0 20 20" width="20" height="20" fill="#8a8d91">
              <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"/>
            </svg>
          </button>

          <div className="p-4 pb-6">
            <div className="mb-4 border-b border-[#dadde1] pb-4">
              <h1 className="text-[32px] font-bold text-[#1c1e21] leading-[38px]">Sign Up</h1>
              <p className="text-[#606770] text-[15px]">It's quick and easy.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <div className="bg-[#ffebe8] border border-[#dd3c10] text-[#dd3c10] px-3 py-2 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-[#ccd0d5] rounded-md text-[15px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:bg-white"
                  required
                />
                
                <input
                  type="text"
                  name="lastName"
                  placeholder="Surname"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-[#ccd0d5] rounded-md text-[15px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:bg-white"
                  required
                />
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#ccd0d5] rounded-md text-[15px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:bg-white"
                required
              />
              
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#ccd0d5] rounded-md text-[15px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:bg-white"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#ccd0d5] rounded-md text-[15px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] focus:bg-white"
                required
              />

              <div className="pt-2">
                <p className="text-[11px] text-[#777] leading-[14px]">
                  People who use our service may have uploaded your contact information to Facebook.{' '}
                  <button type="button" className="text-[#385898] hover:underline">Learn more</button>.
                </p>
              </div>

              <div className="pt-1">
                <p className="text-[11px] text-[#777] leading-[14px]">
                  By clicking Sign Up, you agree to our{' '}
                  <button type="button" className="text-[#385898] hover:underline">Terms</button>,{' '}
                  <button type="button" className="text-[#385898] hover:underline">Privacy Policy</button> and{' '}
                  <button type="button" className="text-[#385898] hover:underline">Cookies Policy</button>. 
                  You may receive SMS notifications from us and can opt out at any time.
                </p>
              </div>
              
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00a400] hover:bg-[#42b72a] text-white font-bold text-lg px-16 py-2 rounded-md transition-colors disabled:bg-[#e4e6eb] disabled:text-[#bcc0c4] disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="text-[#1877f2] text-[17px] font-semibold hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
