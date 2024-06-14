'use client'
import React from 'react';
import DocumentList from "@/app/DocumentList";
import UserProfileForm from "@/app/UserProfileForm";

export default function Auswahl() {

    const [auswahl, setAuswahl] = React.useState('');

    if (auswahl === "dokumente") {
        return <DocumentList />
    }
    else if (auswahl === "bearbeiten") {
        return <UserProfileForm />
    }
    return (
        <div>
            <button onClick={() => setAuswahl("bearbeiten")}>Benutzer bearbeiten</button>
            <button onClick={() => setAuswahl("dokumente")}>Dokumente ansehen</button>
        </div>
    );
}