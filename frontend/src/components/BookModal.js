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
                //'Content-Type':'multipart/form-data',
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
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroud: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        background: "white",
                        height: 150,
                        width: 240,
                        margin: "auto",
                        padding: "2%",
                        border: "2px solid #000",
                        borderRadius: "10px",
                        boxShadow: "2px solid black"
                    }}
                >
                    <button
                        onClick={onClose}>
                        x
                    </button>
                    <p>Title</p>
                    <input
                        value={title}
                        onChange={(text) => setTitle(text.target.value)}
                    />
                    <p>Author</p>
                    <input
                        value={author}
                        onChange={(text) => setAuthor(text.target.value)}
                    />
                    <input type="file" onChange={(e) => setCover(e.target.files[0])}></input>
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