import withAuth from '@/utils/withAuth';
import Link from 'next/link';

const MyPosts = ({ posts }) => {
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-2xl font-semibold">My Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a className="text-blue-500">{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/posts?user=myuser');
  const posts = await res.json();

  return { props: { posts } };
}

export default withAuth(MyPosts);