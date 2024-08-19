import { useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/utils/withAuth';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    console.log(res)
    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 mt-4 border rounded"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full px-4 py-2 mt-4 border rounded"
            required
          />
          <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreatePost);