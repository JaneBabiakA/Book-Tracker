import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import BookRow from "./BookRow";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

export default function BookList({shouldReload, setShouldReload}) {
  const { token } = useAuthContext();
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
        'Authorization' : `Bearer ${token}`,
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    });
    const json = await res.json();
    if(res.ok){
      setBooks(json);
    }
  };

  const changeSort = (aField) => {
    if(aField === field){
      setDirection(direction === "desc" ? "asc" : "desc"); // Flip sort direction
    }
    else {
      setField(aField);
      setDirection("asc"); // Reset sort direction
    }
    setShouldReload(true);
  }

  let arrow;
  if(direction == "desc"){
    arrow = <FaCaretDown/>;
  } else {
    arrow = <FaCaretUp/>;
  }


  return (
    <div className="listContainer">
      <table className="list">
        <thead>
        <tr className="row">
          <th className="titleCell">
            <p onClick={() => changeSort("title") }>
              Title
              { field === "title" ? arrow : null }
            </p>
          </th>
          <th className="cell">
            <p onClick={() => changeSort("author") }>
              Author
              { field === "author" ? arrow : null }
            </p>
          </th>
          <th className="cell">
            <p onClick={() => changeSort("startDate") }>
              Start Date
              { field === "startDate" ? arrow : null }
            </p>
          </th>
          <th className="cell">
            <p onClick={() => changeSort("endDate") }>
              End Date
              { field === "endDate" ? arrow : null }
            </p>
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



