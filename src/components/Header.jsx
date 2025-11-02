const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <div className="py-3 px-35 justify-between flex items-center">
      <img
        className="cursor-pointer"
        width="180px"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />

      {isSignedIn && (
        <button
          onClick={handleLogout}
          className="bg-[#e50914] text-sm text-white font-semibold px-4 rounded-sm h-[30px] cursor-pointer"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
