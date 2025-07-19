import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCamera, FiHeart, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import AuthModal from '@/components/auth/AuthModal';
import { supabase } from '@/lib/supabase';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <Head>
        <title>SnapBuy - AI-Powered Shopping</title>
        <meta name="description" content="Discover products with a snap" />
        <link rel="icon" href="/snapbuy-logo.svg" />
      </Head>

      <div className="min-h-screen flex flex-col bg-taupe-light text-olive-dark">
        <header className="sticky top-0 bg-olive-dark z-10 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold text-gray-soft">SnapBuy</h1>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="p-2 rounded-full bg-taupe-light text-olive-dark"
          >
            <FiUser size={24} />
          </button>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-olive-dark flex justify-around py-3 border-t border-olive">
          <button 
            onClick={() => router.push('/')}
            className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-gray-soft' : 'text-taupe-light'}`}
          >
            <FiCamera size={24} />
            <span className="text-xs mt-1">Scan</span>
          </button>
          <button 
            onClick={() => router.push('/feed')}
            className={`flex flex-col items-center p-2 ${isActive('/feed') ? 'text-gray-soft' : 'text-taupe-light'}`}
          >
            <FiHeart size={24} />
            <span className="text-xs mt-1">Feed</span>
          </button>
        </nav>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
             }
