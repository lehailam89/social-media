import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentLogins, setRecentLogins] = useState([]);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/recent');
        setRecentLogins(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recent users:', error);
      }
    };
    fetchRecentUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAccount = (id) => {
    // Handle remove account logic
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex gap-12">
        {/* Left Section - Recent Logins */}
        <div className="flex-1 hidden lg:block">
          <div className="mb-6">
              <path d="M60.3 8.3h8.8v33.5h-8.8V8.3zm10.2 0h8.8v33.5h-8.8V8.3zm10.2 0h8.8v33.5h-8.8V8.3z"/>
            <h1 className="text-[#1877f2] text-5xl font-bold mb-2">facebook</h1>
          </div>

          <h2 className="text-2xl font-normal text-[#1c1e21] mb-2">Recent logins</h2>
          <p className="text-[#65676b] text-sm mb-5">Click your picture or add an account.</p>

          <div className="grid grid-cols-4 gap-2 max-w-2xl">
            {recentLogins.map((account) => (
              <div key={account.id} className="relative group">
                <div className="bg-white rounded-lg border border-[#dddfe2] p-0 cursor-pointer hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => handleRemoveAccount(account.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-[#f0f2f5]"
                  >
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="#65676b">
                      <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"/>
                    </svg>
                  </button>
                  <div className="flex flex-col items-center p-3">
                    <div className="w-32 h-32 rounded-lg overflow-hidden mb-3 bg-[#e4e6eb] flex items-center justify-center">
                      {account.profilePicture ? (
                        <img src={account.profilePicture} alt={`${account.firstName} ${account.lastName}`} className="w-full h-full object-cover" />
                      ) : (
                        <svg viewBox="0 0 112 112" fill="#8a8d91" width="112" height="112">
                          <circle cx="56" cy="35" r="16"/>
                          <path d="M56 56c-13.255 0-24 10.745-24 24v8h48v-8c0-13.255-10.745-24-24-24z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-lg font-medium text-[#050505] text-center">{account.firstName} {account.lastName}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Account Button */}
            <div className="bg-white rounded-lg border border-[#dddfe2] cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center justify-center p-3 min-h-[180px]">
              <div className="w-10 h-10 bg-[#e7f3ff] rounded-full flex items-center justify-center mb-3">
                <svg viewBox="0 0 20 20" width="24" height="24" fill="#1877f2">
                  <path d="M15.5 10.25a.75.75 0 01-.75.75H11v3.75a.75.75 0 11-1.5 0V11H5.75a.75.75 0 010-1.5h3.75V5.75a.75.75 0 011.5 0v3.75h3.75a.75.75 0 01.75.75z"/>
                </svg>
              </div>
              <span className="text-base font-medium text-[#1877f2] text-center">Add Account</span>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 lg:max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <div className="bg-[#ffebe8] border border-[#dd3c10] text-[#dd3c10] px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}
              
              <input
                type="email"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-[#dddfe2] rounded-md text-base focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]"
                required
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-[#dddfe2] rounded-md text-base focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]"
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xl py-3 rounded-md transition-colors disabled:bg-[#e4e6eb] disabled:text-[#bcc0c4] disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <div className="text-center my-4">
              <Link to="/forgot-password" className="text-[#1877f2] text-sm hover:underline">
                Forgotten password?
              </Link>
            </div>

            <div className="border-t border-[#dadde1] pt-5 pb-3 flex justify-center">
              <Link
                to="/register"
                className="bg-[#42b72a] hover:bg-[#36a420] text-white font-semibold px-4 py-3 rounded-md text-base transition-colors inline-block"
              >
                Create new account
              </Link>
            </div>
          </div>

          <p className="text-sm text-center mt-7">
            <Link to="/page/create" className="font-semibold hover:underline">
              Create a Page
            </Link>
            {' '}for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
