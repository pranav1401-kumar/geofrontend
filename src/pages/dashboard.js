import { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import FileUpload from '../components/FileUpload';
import { getGeoData } from '../services/api';

// Dynamic import of Map component
const MapWithNoSSR = dynamic(
    () => import('../components/MapView'),
    { 
        ssr: false,
        loading: () => <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Map...</div>
    }
);

const Dashboard = () => {
    const [geoData, setGeoData] = useState([]);
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchGeoData = async () => {
            try {
                const response = await getGeoData(token);
                setGeoData(response.data);
            } catch (error) {
                console.error('Error fetching geo data:', error);
            }
        };

        fetchGeoData();
    }, [token, router]);

    return (
        <div className="container">
            <div className="header">
                <h1>Dashboard</h1>
                <FileUpload token={token} />
            </div>
            <div className="map-wrapper">
                <MapWithNoSSR geoData={geoData} />
            </div>

            <style jsx>{`
                .container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .header {
                    margin-bottom: 20px;
                }
                .map-wrapper {
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;