import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };
  return (
    <div className="p-4 bg-green-950">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">a Board</h1>
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
