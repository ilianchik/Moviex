import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-white flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="uppercase text-red-600 text-4xl font-bold cursor-pointer">
          moviex
        </h1>
      </Link>

      {user?.email ? (
        <div className="flex gap-5 items-center">
          <Link to="/account">
            <button className="">Account</button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Link to="/login">
            <button className="">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
