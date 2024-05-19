import React from 'react';
import PropTypes from 'prop-types';

// Product data could be fetched from an API or defined here
const products = [
    {
        id: 1,
        name: 'Product One',
        description: "This is a description of the first product. It's a great choice for anyone looking for quality and performance.",
        price: '$199',
        imageUrl: 'https://placehold.co/100x50'
    },
    {
        id: 2,
        name: 'Product Two',
        description: "Explore the features of our second product. It offers exceptional value and versatility.",
        price: '$299',
        imageUrl: 'https://placehold.co/100x50'
    },
    {
        id: 3,
        name: 'Product Three',
        description: "Our third product is perfect for those who appreciate top-notch quality and innovation.",
        price: '$399',
        imageUrl: 'https://placehold.co/100x50'
    }
];

// ProductCard component
const ProductCard = ({ product }) => {
    return (
        <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden mx-auto max-w-96">
            <img 
                src={product.imageUrl} 
                alt={`Image of ${product.name}`} 
                className="w-full" 
                onError={(e) => e.target.src = 'https://placehold.co/100x100?text=Image+not+available'} 
            />
            <div className="p-4">
                <h2 className="text-lg font-bold dark:text-white">{product.name}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{product.description}</p>
            </div>
            <div className="flex justify-between items-center p-4">
                <span className="text-zinc-500 dark:text-zinc-400">Starting at {product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buy Now</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired
};

// FeaturedProducts component
const FeaturedProducts = () => {
    return (
        <div className="container mx-auto p-14 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center my-8 dark:text-white">Our Featured Products</h1>
            <div className="inline-grid md:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
