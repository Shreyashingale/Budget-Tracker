import { FC, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setToken: (token: string) => void;
}

const LoginPage: FC<LoginPageProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post('token/', {
        username,
        password,
      });
      const token = response.data.access;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
