import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosAuthInstance from '../../../../API/axiosAuthInstance';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    credentials.username=username
    credentials.password=password
  }, [username,password]);

  const logIn = async () => {
    try {
      const response = await axiosAuthInstance.post(`/user/login`, credentials);
      if (response.data ) { 
        localStorage.setItem('token', response.data.token);
        navigate(`/user/${response.data.loggedId}/conversation`) 
      }
    } catch (error) { 
      setError(`${error?.response?.data?.message}`);
    }
  };

  const receiveUsernameInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
  };

  const receivePasswordInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      logIn();
    }}

  return (
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-4xl font-bold">Linksy | Log in!</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="conversation-list-container overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            <div>
            <div className="mb-4 ml-4">
            <h2>Username:</h2>
            <input
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={receiveUsernameInfo}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div> 
            <div className="mb-6 ml-4">
            <h2>Password:</h2>
              <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={receivePasswordInfo}
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              onKeyPress={handleKeyPress}
            />
            </div>
            <button
              className="ml-5 text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={logIn}
            >
              Enter
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

