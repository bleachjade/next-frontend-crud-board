import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/utils/withAuth';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // console.log(localStorage.getItem("token"))
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default withAuth(Home);