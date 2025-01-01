import { useState } from 'react';
import { createPortal } from 'react-dom';
import Header from './Header';
import BookModal from "./BookModal";
import BookList from "./BookList";

export default function HomePage({}){
    const [open, setOpen] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);

    const handleClose= () => {
        setOpen(false);
    }
      
    const handleSave = () => {
        setOpen(false);
        setShouldReload(true);
    }

    return (
        <div className="App">
            {createPortal(
                <BookModal 
                    open={open} 
                    onClose={handleClose}
                    onSave={handleSave}
                />,
                document.getElementById('root')
            )}
            <Header/>
            <div className="listHeader">
                <button 
                    className="addButton"
                    onClick={() => { setOpen(true) }}
                >
                    +
                </button>
            </div>
            <BookList
                shouldReload={shouldReload}
                setShouldReload={setShouldReload}
            />
        </div>
    )
}