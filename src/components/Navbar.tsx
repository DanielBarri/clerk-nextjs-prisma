import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBullhorn,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center justify-between  gap-6 p-4">
            {/* SEARCH BAR */}
            <div className="hidden md:flex items-center text-xs rounded-full ring-[1.5px]  ring-gray-300 px-2">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    width={15}
                    height={15}
                    className="text-gray-400 "
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[200px] p-2 bg-transparent outline-none"
                />
            </div>
            {/* ICONS AND USER */}

            <div className="flex items-center gap-6 justify-end w-full">
                <SignedOut>
                    <Link
                        href="/sign-in"
                        className="font-semibold text-gray-500">
                        Login
                    </Link>
                    <Link
                        href="/sign-up"
                        className="items-center rounded-md bg-[#5276FA] px-[12px] py-[8px] text-lg text-center font-semibold text-white hover:bg-[#265fd6]">
                        Sign-up
                    </Link>
                </SignedOut>
                <SignedIn>
                    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                        <FontAwesomeIcon
                            icon={faMessage}
                            width={50}
                            height={50}
                            className="text-gray-400"
                        />
                    </div>
                    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                        <FontAwesomeIcon
                            icon={faBullhorn}
                            width={50}
                            height={50}
                            className="text-gray-400"
                        />
                        <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
                            1
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs leading-3 font-medium">
                            John Doe
                        </span>
                        <span className="text-[10px] text-gray-500 text-right">
                            {String(user?.publicMetadata.role ?? "")}
                        </span>
                    </div>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;
