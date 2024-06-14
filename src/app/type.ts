export interface DocFolder {
    id: number;
    title: string;
    sortOrder: number;
}

export interface Document {
    id: number;
    title: string;
    sortOrder: number;
    documentUrl: string;
    size: number;
    docFolder: DocFolder;
}

export interface FolderData {
    docFolder: DocFolder;
    documents: Document[];
    size: string;
}