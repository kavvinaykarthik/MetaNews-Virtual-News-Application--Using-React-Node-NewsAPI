import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const NewsTree = () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const apiKey = ''; // Replace with your NewsAPI API key
                let apiUrl = '';

                if (query.trim() === '') {
                    apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
                } else {
                    apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
                }

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok') {
                    const articlesWithImages = data.articles.filter(article => article.urlToImage);
                    setArticles(articlesWithImages);
                } else {
                    console.error('Failed to fetch news.');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [query]);

    const handleSearch = () => {
        const searchTerm = document.getElementById('search-input').value.trim();
        setQuery(searchTerm);
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <div id='hi'>
            <h1>META_NEWS</h1>
            <h3>A Virtual News Application</h3>
            <a href='/'>Logout</a>
            <div className='search'>
                <input type="text" id="search-input" placeholder="Search for news..." />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className='suggestions'>
            <span className='category' onClick={() => handleCategoryClick('politics')}>Politics</span>
            <span className='category' onClick={() => handleCategoryClick('world')}>World</span>
            <span className='category' onClick={() => handleCategoryClick('business')}>Business</span>
            <span className='category' onClick={() => handleCategoryClick('technology')}>Technology</span>
            <span className='category' onClick={() => handleCategoryClick('science')}>Science</span>
            <span className='category' onClick={() => handleCategoryClick('health')}>Health</span>
            <span className='category' onClick={() => handleCategoryClick('entertainment')}>Entertainment</span>
            <span className='category' onClick={() => handleCategoryClick('sports')}>Sports</span>
            </div>
            <h2>Latest News</h2>
            <div className='container'>
                {articles.map((article, index) => (
                    <div key={index} className="card">
                        <img src={article.urlToImage} alt="News" />
                        <h3>{article.title}</h3>
                        <a href={article.url}>Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTree;
