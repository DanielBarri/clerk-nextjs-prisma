import type { Metadata } from "next";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "App Dashboard",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen w-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-[#313638]">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-4">
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold text-white text-xl">
                        Vocations
                    </span>
                </Link>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
