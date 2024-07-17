import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Weather.css';


interface WeatherData {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
}

const Weather: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const apiKey = '6ad1c8c5e7a845068a684518241607';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            setWeatherData(response.data);
        } catch (error) {
            setError('Nie udało się pobrać danych pogodowych. Spróbuj ponownie później.');
        }
    };

    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    return (
        <Container className="container">
            <h2>Sprawdź aktualną pogodę</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLocation">
                    <Form.Label>Podaj lokalizację</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Wpisz miasto"
                        value={location}
                        onChange={handleLocationChange}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Sprawdź pogodę
                </Button>
            </Form>

            {error && <p className="text-danger mt-2">{error}</p>}

            {weatherData && (
                <Card className="mt-4 custom-card">
                    <Card.Body>
                        <Card.Title className="custom-title">{weatherData.location.name}</Card.Title>
                        <Card.Subtitle className="mb-2 custom-subtitle">
                            Temperatura: {weatherData.current.temp_c}°C
                        </Card.Subtitle>
                        <Card.Text className="custom-text">
                            Warunki pogodowe: {weatherData.current.condition.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default Weather;
