import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/common/Layout';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/');
      }
    });
  }, [router]);

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <p className="text-olive-dark text-xl">Signing you in...</p>
      </div>
    </Layout>
  );
}
