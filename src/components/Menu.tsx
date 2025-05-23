import Link from "next/link";
import {
    faHouse,
    faKey,
    faChalkboardUser,
    faGraduationCap,
    faUsers,
    faPen,
    faChessKnight,
    faRectangleList,
    faListCheck,
    faUser,
    faGear,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currentUser } from "@clerk/nextjs/server";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: faHouse,
                label: "Home",
                href: "/home",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: faKey,
                label: "Admin",
                href: "/admin",
                visible: ["admin"],
            },
            {
                icon: faChalkboardUser,
                label: "Teacher",
                href: "/teacher",
                visible: ["teacher"],
            },
            {
                icon: faGraduationCap,
                label: "Student",
                href: "/student",
                visible: ["student"],
            },
            {
                icon: faUsers,
                label: "Parent",
                href: "/parent",
                visible: ["parent"],
            },
            {
                icon: faPen,
                label: "Test Vocacional",
                href: "/quiz",
                visible: ["admin", "student", "parent", "teacher"],
            },
            {
                icon: faChessKnight,
                label: "Plan de estudio",
                href: "/list/plan",
                visible: ["admin", "student", "parent", "teacher"],
            },
            {
                icon: faRectangleList,
                label: "Temas",
                href: "/list/topics",
                visible: ["admin", "student", "parent", "teacher"],
            },
            {
                icon: faListCheck,
                label: "Progreso",
                href: "/list/progress",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: faUser,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: faGear,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: faArrowRightFromBracket,
                label: "Logout",
                href: "/",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

const Menu = async () => {
    const user = await currentUser();
    const role = user?.publicMetadata.role as string;
    return (
        <div className="mt-4 text-sm ">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-1.5" key={i.title}>
                    <span className="hidden lg:block text-white font-semibold my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) => {
                        if (item.visible.includes(role)) {
                            return (
                                <Link
                                    href={item.href}
                                    key={item.label}
                                    className="flex items-center justify-center lg:justify-start gap-4 text-white font-semibold py-2 md:px-2 rounded-md hover:bg-white hover:text-gray-700">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        width={20}
                                        height={20}
                                    />
                                    <span className="hidden lg:block ">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default Menu;
