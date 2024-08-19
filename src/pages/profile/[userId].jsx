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
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          console.log(data);
          setPosts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserPosts();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="my-4">Posts by username: {posts.username}</h1>
      <div className="flex flex-col gap-4">
        {posts.posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
