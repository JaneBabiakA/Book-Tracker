import BookRow from "./BookRow";
import BookModal from "./BookModal";
import { useEffect, useState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShouldReload(false);
    getBooks();
  }, [shouldReload]);

  const getBooks = async () => {
    const res = await fetch('http://localhost:8080/api/books', {
      method:'GET',
      headers : {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    });
    const json = await res.json();
    if(res.ok){
      setBooks(json);
    }
  };

  const handleClose= () => {
    setOpen(false);
  }
  
  const handleSave = () => {
    setOpen(false);
    setShouldReload(true);
  }

  return (
    <div className="list">
      <BookModal 
        open={open} 
        onClose={handleClose}
        onSave={handleSave}
      />
      <div className="header">
      <button 
        className="addButton"
        onClick={() => { setOpen(true) }}
      >
        +
      </button>
      </div>
      <div className="rows">
        { books && books.map((aBook) => 
          <BookRow
            aItem={aBook}
            setShouldReload={setShouldReload}
          />
        )}
      </div>
    </div>
  );
}



