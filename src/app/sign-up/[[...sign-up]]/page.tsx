"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesLeft,
    faEarthAmericas,
    faLifeRing,
} from "@fortawesome/free-solid-svg-icons";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[100%] lg:w-[50%] xl:w-[50%] p-4 flex flex-col">
                <div className="w-[100%] h-[50px] items-start m-2">
                    <Link href="/" className="h-40 w-40">
                        <FontAwesomeIcon
                            icon={faAnglesLeft}
                            className="text-black cursor-pointer fa-2x"
                        />
                    </Link>
                </div>
                <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
                    <SignUp />
                </div>
                <div className="w-[100%] h-[50px] flex items-center justify-center gap-6 text-blue-500">
                    <Link
                        className="flex gap-1 items-center justify-center"
                        href="">
                        <FontAwesomeIcon
                            icon={faEarthAmericas}
                            className="text-blue-500 cursor-pointer fa-md"
                        />
                        <span>español</span>
                    </Link>
                    <Link
                        className="flex gap-1 items-center justify-center"
                        href="">
                        <FontAwesomeIcon
                            icon={faLifeRing}
                            className="text-blue-500 cursor-pointer fa-md"
                        />

                        <span>Ayuda</span>
                    </Link>
                </div>
            </div>
            {/* RIGHT */}
            <div className="hidden lg:block w-[50%] xl:w-[50%] bg-[#F7F8FA] h-[100%] relative overflow-hidden">
                <Image
                    src="/login.png"
                    fill
                    className="object-cover absolute top-1/2 left-1/2 -translate-x-1.2 -translate-y-1.2"
                    alt="Your description"
                />
            </div>
        </div>
    );
};

export default SignUpPage;
