import BookRow from "./BookRow";
import { useEffect, useState } from 'react';

export default function BookList({shouldReload, setShouldReload}) {
  const [books, setBooks] = useState([]);
  const [field, setField] = useState("endDate");
  const [direction, setDirection] = useState("desc");

  useEffect(() => {
    setShouldReload(false);
    getBooks();
  }, [shouldReload]);

  const getBooks = async () => {
    const res = await fetch(`http://localhost:8080/api/books?field=${field}&direction=${direction}`, {
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

  const changeSort = (aField) => {
    if(aField == field){
      setDirection(direction == "desc" ? "asc" : "desc"); // Flip sort direction
    }
    else {
      setField(aField);
      setDirection("desc"); // Reset sort direction
    }
    setShouldReload(true);
  }


  return (
    <div className="listContainer">
      <table className="list">
        <thead>
        <tr className="row">
          <th className="titleColumn">
            <div className="listHeader">
              Title & Author
            </div>
          </th>
          <th className="dateColumn">
            <div className="listHeader">
              <button  onClick={() => changeSort("startDate") }>
                Start Date
              </button>
            </div>
          </th>
          <th className="dateColumn">
            <div className="listHeader"
                  onClick={() => changeSort("endDate") }>
              End Date
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
          { books.map((aBook, aKey) => 
              <BookRow
                aItem={aBook}
                setShouldReload={setShouldReload}
                key={aKey}
              />
          )}
        </tbody>
      </table>
    </div>
  );
}



