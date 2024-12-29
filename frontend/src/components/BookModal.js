import React from "react";
import { useState, useEffect } from "react";

export default function BookModal({open, onClose, onSave}){
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState('');

    useEffect(() => {
        setTitle('');
        setAuthor('');
        setCover('');
    }, [open])

    const createBook = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        if(cover){
            formData.append("cover", cover);
        }
        const res = await fetch('http://localhost:8080/api/books', {
            method:'POST',
            body : formData,
            headers : {
                'Accept': 'application/json'
            }
        })
        const json = await res.json();
        if(res.ok){
            onSave();
        }
    }

    return (
        open ?
            <div className="modal">
                <div className="modalContent">
                    <button
                        onClick={onClose}>
                        x
                    </button>
                    <div className="modalLine">
                        <label>Title:</label>
                        <input 
                            className="modalElement"
                            value={title}
                            onChange={(text) => setTitle(text.target.value)}
                        />
                    </div>
                    <div className="modalLine">
                        <label>Author:</label>
                        <input 
                            className="modalElement"
                            value={author}
                            onChange={(text) => setAuthor(text.target.value)}
                        />
                    </div>
                    <div className="modalLine">
                        <label>Cover:</label>
                        <input 
                            className="modalElement" 
                            type="file" 
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                    </div>
                    <button
                        onClick={createBook}
                    >
                        Save
                    </button>
                </div>
            </div>
        :
        null
    )
}