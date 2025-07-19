import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-taupe-light bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-soft rounded-xl p-6 w-full max-w-md border border-olive">
        <h2 className="text-2xl font-bold mb-6 text-olive-dark">
          {isSignUp ? 'Create Account' : 'Log In'}
        </h2>
        
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-taupe-light border border-olive rounded-lg px-4 py-3 text-olive-dark"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-taupe-light border border-olive rounded-lg px-4 py-3 text-olive-dark"
          />
          
          {error && <p className="text-red-600">{error}</p>}
          
          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-olive-dark hover:bg-olive text-taupe-light py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
          
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-olive hover:text-olive-dark underline"
            >
              {isSignUp ? 'Already have an account? Log In' : 'Create new account'}
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-olive-dark hover:text-olive"
        >
          ✕
        </button>
      </div>
    </div>
  );
      }
