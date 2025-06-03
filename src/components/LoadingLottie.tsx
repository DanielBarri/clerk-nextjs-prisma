"use client";

import * as loading from "../animations/loading.json";
import { useLottie } from "lottie-react";

const MyLottieComponent = () => {
    const defaultOptions = {
        animationData: loading,
        loop: true,
    };

    const { View } = useLottie(defaultOptions);

    return (
        <>
            <div
                className=" bg-gray-400/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100
">
                <h1 className="text-white font-bold text-xl mb-4 text-center p-4">
                    La IA esta analizando tu información
                </h1>
                <div className="w-full">{View}</div>
            </div>
        </>
    );
};

export default MyLottieComponent;
