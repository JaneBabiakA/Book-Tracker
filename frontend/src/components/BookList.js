import BookRow from "./BookRow";
import { useEffect, useState } from 'react';

export default function BookList({shouldReload, setShouldReload}) {
  const [books, setBooks] = useState([]);

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
    console.log(json);
  };

  return (
    <div>
      <div className="list">
        <div className="rows">
          { books.map((aBook) => 
              <BookRow
                aItem={aBook}
                setShouldReload={setShouldReload}
              />
          )}
        </div>
      </div>
    </div>
  );
}



