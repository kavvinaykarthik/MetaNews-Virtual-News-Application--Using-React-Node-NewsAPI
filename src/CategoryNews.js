import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

const CategoryNews = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const apiKey = ''; // Replace with your NewsAPI API key
                const apiUrl = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(category)}&country=us&apiKey=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok') {
                    const articlesWithImages = data.articles.filter(article => article.urlToImage);
                    setArticles(articlesWithImages);
                } else {
                    console.error('Failed to fetch news:', data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='cat'>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <span id='ha'><a href='/'>Go Home</a></span>
            {articles.length === 0 ? (
                <div>No articles found for this category.</div>
            ) : (
                <div className='container'>
                    {articles.map((article, index) => (
                        <div key={index} className="card">
                            <img src={article.urlToImage} alt="News" />
                            <h3>{article.title}</h3>
                            <a href={article.url}>Read More</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryNews;
