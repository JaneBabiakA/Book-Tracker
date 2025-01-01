import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function BookModal({open, onClose, onSave}){
    const [buttonColour, setButtonColour] = useState("");
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        setTitle('');
        setAuthor('');
        setCover('');
    }, [open])

    const startHover = () => {
        setButtonColour("#E5E4E2");
    }

    const endHover = () => {
        setButtonColour("");
    }

    const createBook = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        if(startDate){
            formData.append("startDate", startDate);
        }
        if(endDate){
            formData.append("endDate", endDate);
        }
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
        await res.json();
        if(res.ok){
            setButtonColour("");
            onSave();
        }
    }

    return (
        open ?
        <div className="App">
            <div className="modal">
                <div className="modalInner">
                    <button className="modalClose"
                            style={{ backgroundColor: buttonColour }}
                            onClick={() => {
                                setButtonColour("");
                                onClose();
                            }}
                            onMouseEnter={startHover}
                            onMouseLeave={endHover}
                    >
                        x
                    </button>
                    <div className="modalContent">
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
                            <label>Start date:</label>
                            <input className="modalElement"
                                    type="date"
                                    onChange={(date) => setStartDate(date.target.value)}
                            />
                        </div>
                        <div className="modalLine">
                            <label>End date:</label>
                            <input className="modalElement"
                                    type="date"
                                    onChange={(date) => setEndDate(date.target.value)}
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
                        <div className="modalSaveContainer">
                            <button className="modalSave"
                                onClick={createBook}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        null
    )
}