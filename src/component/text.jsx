import React from 'react';

const Welcome = () => {
    return (
        <div className="container mx-auto p-14">
            <div className="bg-white dark:bg-zinc-800 flex flex-col md:flex-row justify-center items-center">
                <WelcomeText />
                <ImageSection />
            </div>
        </div>
    );
};

const WelcomeText = () => {
    return (
        <div className="text-zinc-800 dark:text-white md:w-1/2">
            <h1 className="text-3xl font-bold mb-3 text-center">Selamat Datang!</h1>
            <p className="text-lg mb-4">Kami senang Anda bergabung dengan kami. Jelajahi lebih lanjut untuk mengetahui lebih banyak tentang kami dan apa yang kami tawarkan.</p>
        </div>
    );
};

const ImageSection = () => {
    return (
        <div className="md:w-1/2 flex flex-col justify-center items-center">
            <img src="https://placehold.co/400x300" alt="Main Image" className="rounded-lg mb-4 w-full md:w-auto"/>
            <div className="flex justify-center items-center w-full flex-wrap">
                <SmallImage src="https://placehold.co/120x90" alt="Small Image 1" />
                <SmallImage src="https://placehold.co/120x90" alt="Small Image 2" />
                <SmallImage src="https://placehold.co/120x90" alt="Small Image 3" />
            </div>
        </div>
    );
};

const SmallImage = ({ src, alt }) => {
    return (
        <img src={src} alt={alt} className="rounded-lg shadow-md mx-2 my-2 w-24 h-18" />
    );
};

export default Welcome;
