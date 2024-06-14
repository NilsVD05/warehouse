'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FolderData } from './type';
import Auswahl from '@/app/Auswahl';

export default function DocumentList() {
    const [data, setData] = useState<FolderData[] | null>(null);
    const [back, setBack] = useState(false);

    // Laden der Profildaten beim Laden der Komponente
    useEffect(() => {
        fetch('http://localhost:8080/folder/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data: FolderData[]) => {
                setData(data);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }
    if (back) {
        return <Auswahl />;
    }

    return (
        <div className={styles.container}>
            <button onClick={() => setBack(true)} className={styles.backButton}>Back</button>
            {data.map((folder) => (
                <div key={folder.docFolder.id} className={styles.folder}>
                    <h2>{folder.docFolder.title}</h2>
                    <p>Folder Sort Order: {folder.docFolder.sortOrder}</p>
                    <p>Total Size: {folder.size}</p>
                    <div className={styles.documents}>
                        {folder.documents.map((doc) => (
                            <div key={doc.id} className={styles.document}>
                                <h3>{doc.title}</h3>
                                <p>Sort Order: {doc.sortOrder}</p>
                                <p>URL: {doc.documentUrl}</p>
                                <p>Size: {doc.size}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
