import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export default function BookView({}) {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const fetchBook = async () => {
        const res = await fetch('http://localhost:8080/api/books/' + id, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await res.json();
        if(res.ok){
            setBook(json);
        }
    };

    //TODO: add keys to list
    //use reload context

    const editBook = async ({ name, value, previousValue }) => {
        const book = {};
        if(name === "title"){
            book.title = value;
        } else {
            book.author = value;
        }
        const res = await fetch('http://localhost:8080/api/books/' + id, {
            method: 'PUT',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = res.json();
        if(res.ok){
            console.log(json);
            setBook(json);
            console.log(book.title);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id])

    return (
        book ?
            <div>
                <EditText  
                    name="title"
                    defaultValue={book.title}
                    onSave={editBook}/>
                <EditText  
                    name="author"
                    defaultValue={book.author}
                    onSave={editBook}/>
                <img src={book.cover}/>
            </div>
        : 
        <p>Not found.</p>
    );
}