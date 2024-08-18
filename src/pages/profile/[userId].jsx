import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/posts/user/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setPosts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts by User {userId}</h1>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
