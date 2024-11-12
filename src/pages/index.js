import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to Geo Data App</h1>
            <p>Manage and visualize geospatial data with ease</p>
            <div>
                <Link href="/login">
                    <span style={styles.button}>Login</span>
                </Link>
                <br />
                <Link href="/signup">
                    <span style={styles.button}>Sign Up</span>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    button: {
        display: 'inline-block',
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        cursor: 'pointer', // Add cursor pointer for the button
    }
};

export default Home;
