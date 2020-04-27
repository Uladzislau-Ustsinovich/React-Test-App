import React from 'react';
import './Header.less'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__settings_link">
                        <h2>MAIN</h2>
                    </Link>
                    <Link to="/Chart" className="header__settings_link">
                        <h2>CHART</h2>
                    </Link>
                </div>
            </div>
        </header>
    )
};

