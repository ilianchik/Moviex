function Navbar() {
  return (
    <div className="text-white flex items-center justify-between p-4 z-[100] w-full absolute">
      <h1 className="uppercase text-red-600 text-4xl font-bold cursor-pointer">
        moviex
      </h1>
      <div className="flex gap-5 items-center">
        <button className="">Sign In</button>
        <button className="bg-red-600 px-6 py-2 rounded cursor-pointer">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
