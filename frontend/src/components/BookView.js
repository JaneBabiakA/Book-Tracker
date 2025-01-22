import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useAuthContext } from "../hooks/useAuthContext";

export default function BookView({}) {
    const { id } = useParams();
    const { token } = useAuthContext();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBook = async () => {
        setIsLoading(true);
        const res = await fetch('http://localhost:8080/api/books/' + id, {
            method:'GET',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await res.json();
        setIsLoading(false);
        if(res.ok){
            setBook(json);
        }
    };

    const editBook = async ({ name, value }) => {
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
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = res.json();
        if(res.ok){
            setBook(json);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id])

    if(isLoading){
        return (
            null
        )
    }

    return (
        <div className="App">
            <Header/>
            <div className="bookPage">
                <Link className="backLink" to={"/"}>
                    {'<'} Back
                </Link>
                { book ?
                    <div className="bookContainer">
                        <img className="bookCover" src={book.cover}/>
                        <div className="bookDetails">
                            <EditText  
                                className="bookDetails"
                                name="title"
                                defaultValue={book.title}
                                onSave={editBook}/>
                            <EditText  
                                className="bookDetails"
                                name="author"
                                defaultValue={book.author}
                                onSave={editBook}/>
                        </div>
                    </div>
                : 
                <p>Not found.</p>
                }
            </div>
        </div>
    );
}