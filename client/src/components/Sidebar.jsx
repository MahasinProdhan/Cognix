import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, user, theme, setTheme, navigate } =
    useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 
      dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
      border-r border-[#80609f]/30 backdrop-blur-3xl 
      transition-all duration-500 
      max-md:absolute left-0 z-10   ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* LOGO */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        className="w-full max-w-48"
        alt="Cognix Logo"
      />

      {/* New chat button */}
      <button
        className="flex justify-center items-center w-full py-2 mt-10 
        text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] 
        text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span>
        New Chat
      </button>

      {/* SEARCH CONVERSATION */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md dark:border-white/20">
        <img
          src={assets.search_icon}
          className="w-4 invert dark:invert-0"
          alt="Search"
        />

        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="w-full text-xs bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      {/* RECENT CHAT */}
      {chats.length > 0 && (
        <p
          className="mt-6 mb-2 text-xs uppercase tracking-wider 
          text-gray-500 dark:text-[#B1A6C0]"
        >
          Recent Chats
        </p>
      )}

      <div className="flex-1 mt-3 space-y-3 overflow-y-auto text-sm">
        {chats
          .filter((chat) => {
            if (chat.messages && chat.messages.length > 0) {
              return chat.messages[0].content
                .toLowerCase()
                .includes(search.toLowerCase());
            }
            return chat.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              className="p-2 px-4 dark:bg-[#57317c]/10 
                border border-gray-300 dark:border-[#80609f]/15 
                rounded-md cursor-pointer flex justify-between 
                group hover:bg-gray-100 dark:hover:bg-[#57317c]/20"
            >
              <div className="overflow-hidden">
                <p className="w-full truncate">
                  {chat.messages && chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>

                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                onClick={(e) => e.stopPropagation()}
                className="hidden w-4 cursor-pointer invert dark:invert-0 opacity-70 hover:opacity-100 group-hover:block"
                alt="Delete"
              />
            </div>
          ))}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 p-3 mt-4 transition-all border border-gray-300 rounded-md cursor-pointer dark:border-white/15 hover:scale-105"
      >
        <img
          src={assets.gallery_icon}
          className="w-4 invert dark:invert-0"
          alt="Community"
        />

        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit purchase option */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 p-3 mt-4 transition-all border border-gray-300 rounded-md cursor-pointer dark:border-white/15 hover:scale-105"
      >
        <img
          src={assets.diamond_icon}
          className="w-4 dark:invert"
          alt="Community"
        />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400">
            Purchase credits to use Cognix
          </p>
        </div>
      </div>

      {/* Dark Mode toggle  */}

      <div className="flex items-center justify-between gap-3 p-3 mt-4 transition-all border border-gray-300 rounded-md cursor-pointer dark:border-white/15 hover:scale-105">
        <div className="flex flex-col text-sm">
          <img
            src={assets.theme_icon}
            className="w-4 not-dark:invert"
            alt="Community"
          />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="h-5 transition-all bg-gray-400 rounded-full w-9 peer-checked:bg-purple-600"></div>

          <span className="absolute w-3 h-3 transition-transform bg-white rounded-full left-1 top-1 peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}

      <div className="flex items-center gap-3 p-3 mt-4 transition-all border border-gray-300 rounded-md cursor-pointer group dark:border-white/15 hover:scale-105">
        <img
          src={assets.user_icon}
          className="rounded-full w-7 opacity-90"
          alt="User"
        />

        <p className="flex-1 text-sm truncate dark:text-primary">
          {user ? user.name : "Login your account"}
        </p>

        {user && (
          <img
            src={assets.logout_icon}
            className="hidden h-5 cursor-pointer opacity-70 group-hover:block hover:opacity-100"
            alt="Logout"
          />
        )}
      </div>

      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute w-5 h-5 cursor-pointer top-3 right-3 md:hidden invert dark:invert-0 opacity-80 hover:opacity-100"
        alt="Close"
      />
    </div>
  );
};

export default Sidebar;
