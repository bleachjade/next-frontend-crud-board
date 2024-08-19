import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className="p-2 text-white bg-green-500 rounded-lg" onClick={() => router.push(`/posts/create`)}>
          Create new post
        </button>
        <button className="p-2 text-white bg-green-600 rounded-lg" onClick={() => router.push(`/profile/${userId}`)}>
          Profile
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:max-w-[50vw] mx-auto">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <div className="mb-2 text-gray-500">
              username: {post.user.username}
            </div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default withAuth(Home);
