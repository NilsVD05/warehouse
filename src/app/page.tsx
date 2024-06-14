'use client'
import {useState} from 'react'
import styles from './page.module.css';
import UserProfileForm from './UserProfileForm';
import DocumentList from './DocumentList';
import Auswahl from "@/app/Auswahl";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logedIn, setLogedIn] = useState(false);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('');
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({username:email, password}),
        }).then(response => response.json()).then(data => {
            sessionStorage.setItem('token', data.jwt);
            setLogedIn(true);
        }).catch(error => setError(error || 'Login failed'));
    }
if (logedIn) {
    return <Auswahl />
}

    return (<div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}><h2 className={styles.title}>Sign In Form</h2>
            <div className={styles.field}><label htmlFor="email">Username</label> <input id="email"
                                                                                              name="email" value={email}
                                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                                              required/></div>
            <div className={styles.field}><label htmlFor="password">Password</label> <input type="password"
                                                                                            id="password"
                                                                                            name="password"
                                                                                            value={password}
                                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                                            required/></div>
            {error && <p className={styles.error}>          {JSON.stringify(error)}        </p>}
            <button type="submit" className={styles.button}>sign in</button>
        </form>
    </div>)
}