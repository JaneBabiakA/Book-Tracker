import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function BookRow({aItem, setShouldReload}) {
  const deleteBook = async () => {
    const res = await fetch('http://localhost:8080/api/books/' + aItem._id, {
      method:'DELETE',
    });
    const json = await res.json();
    if(res.ok){
      setShouldReload(true);
    }
  }

  const span = useRef(null);
  return (
    <div className="row">
      <span className="rowDetails"
            ref={span}
            onClick={() => {
              span?.current?.focus();
            }}
      >
        <Link to={`/book/${aItem._id}`}>
          <p className="title">{aItem.title}</p>
          <p className="author">{aItem.author}</p>
        </Link>
      </span>
      <button className="rowDelete"
        onClick={deleteBook}
      />
    </div>
  );
}