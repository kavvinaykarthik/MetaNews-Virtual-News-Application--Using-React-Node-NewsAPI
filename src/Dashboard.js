import React, { useEffect, useState } from 'react';
import './index.css';

const Dashboard = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_KEY');
                const data = await response.json();

                if (data.status === 'ok') {
                    const articlesWithImages = data.articles.filter(article => article.urlToImage);
                    setNews(articlesWithImages);
                } else {
                    console.error('Failed to fetch news.');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>
            <div className='container'>
                {news.map((article, index) => (
                    <div key={index} className="card">
                        <img src={article.urlToImage} alt="News" />
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url}>Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
