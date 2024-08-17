import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchPost() {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        const data = await res.json();
        setPost(data);
      }

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-600">{post.content}</p>
      </div>
      {/* Add comment section here */}
    </div>
  );
}
export default PostDetail;