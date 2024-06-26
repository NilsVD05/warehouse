'use client'
import {useState, useEffect} from 'react'
import styles from './page.module.css';

export default function UserProfileForm() {
    const [firstname, setFirstname] = useState('');
    const [id, setId] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [profilepictureurl, setProfilepictureurl] = useState('');

    // Laden der Profildaten beim Laden der Komponente
    useEffect(() => {
        fetch('http://localhost:8080/api/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setId(data.id);
                setFirstname(data.first_name);
                setLastname(data.last_name);
                setAddress(data.address);
                setProfilepictureurl(data.profilepicture_url);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Speichern der Profildaten
        fetch('http://localhost:8080/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: id,
                first_name: firstname,
                last_name: lastname,
                address: address,
                profilepicture_url: profilepictureurl
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Hier können Sie eine Erfolgsmeldung anzeigen oder andere Aktionen durchführen
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>User Profile Form</h2>

                <div className={styles.field}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="profilepictureurl">Profile Picture URL</label>
                    <input
                        type="text"
                        id="profilepictureurl"
                        value={profilepictureurl}
                        onChange={(e) => setProfilepictureurl(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Update Profile</button>
            </form>
        </div>
    )
}