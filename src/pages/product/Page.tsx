import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const found = mockData.find(item => item.id === Number(id));
        
        if (found) {
            setProduct(found);
        }
        
        setLoading(false);
        window.scrollTo(0, 0);
    }, [id]);

    const similarProducts = useMemo(() => {
        if (!product) return [];
        return mockData
            .filter(item => item.category === product.category && item.id !== product.id)
            .slice(0, 4);
    }, [product]);

    if (loading) return <div className="loader">Считывание полетных данных...</div>;
    if (!product) return <div className="error">Объект не найден в системе.</div>;

    return (
        <div className="product-page-wrapper">
            <section className="product-main-grid">
                <div className="product-visuals">
                    <div className="main-image-container">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                <div className="product-actions">
                    <nav className="breadcrumb">
                        <Link to="/">Каталог</Link> / <span>{product.category}</span>
                    </nav>
                    
                    <h1>{product.name}</h1>
                    <p className="price-display">{product.price.toLocaleString()} ₽</p>

                    <div className="quick-specs">
                        <div className="spec-badge">
                            <strong>{product.specifications.flightTime}</strong>
                        </div>
                        <div className="spec-badge">
                            <strong>{product.specifications.range}</strong> 
                        </div>
                    </div>

                    <button 
                        className={`buy-btn ${!product.inStock ? 'disabled' : ''}`}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'Добавить в полетный лист' : 'Нет в наличии'}
                    </button>
                </div>
            </section>

            <section className="detailed-info">
                <div className="tabs">
                    <button className="tab active">Описание</button>
                    <button className="tab">Характеристики</button>
                </div>
                <div className="tab-content">
                    <p>{product.fullDescription}</p>
                </div>
            </section>

            {similarProducts.length > 0 && (
                <section className="similar-items-section">
                    <h2>Схожие системы</h2>
                    <div className="similar-grid">
                        {similarProducts.map(item => (
                            <Link to={`/product/${item.id}`} key={item.id} className="similar-card">
                                <img src={item.image} alt={item.name} />
                                <h4>{item.name}</h4>
                                <span>{item.price.toLocaleString()} ₽</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
