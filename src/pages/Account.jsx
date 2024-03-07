import SavedShows from "../components/SavedShows";

function Account() {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/88f57e71-3532-4111-8848-6191aac47b26/UA-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background movie"
        />
        <div className="bg-black/55 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-4">
          <h1 className="text-3xl md:text-5xl font-bold">My Movies</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
}

export default Account;
