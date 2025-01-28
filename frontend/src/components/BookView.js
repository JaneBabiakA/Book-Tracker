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
        console.log(name, value);
        const book = {};
        if(name === "title"){
            book.title = value;
        } 
        else if(name === "author"){
            book.author = value;
        } 
        else if(name === "startDate"){
            book.startDate = value;
        } 
        else if(name == "endDate"){
            book.endDate = value;
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
        const json = await res.json();
        if(res.ok){
            setBook(json);
        }
        console.log(json);
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
                                name="title"
                                defaultValue={book.title}
                                onSave={editBook}/>
                            <EditText
                                name="author"
                                defaultValue={book.author}
                                onSave={editBook}/>
                            <div>
                                Read dates: 
                                <input className="inputElement"
                                    name="startDate"
                                    type="date"
                                    defaultValue={book ? new Date(book.startDate).toISOString().split('T')[0] : null}
                                    onChange={(e) => editBook({ name: "startDate", value: e.target.value} )}
                                />
                                -
                                <input className="inputElement"
                                    name="endDate"
                                    type="date"
                                    defaultValue={book ? new Date(book.endDate).toISOString().split('T')[0] : null}
                                    onChange={(e) => editBook({ name: "endDate", value: e.target.value} )}
                                />
                            </div>
                        </div>
                    </div>
                : 
                <p>Not found.</p>
                }
            </div>
        </div>
    );
}