import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useState } from "react";

export default function BookRow({aItem, setShouldReload}) {
  const [iconSize, setIconSize] = useState(20);
  const deleteBook = async () => {
    const res = await fetch('http://localhost:8080/api/books/' + aItem._id, {
      method:'DELETE',
    });
    const json = await res.json();
    if(res.ok){
      setShouldReload(true);
    }
  }

  const startHover = () => {
    setIconSize(23);
  }

  const endHover = () => {
    setIconSize(20);
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
        <Link className="link" to={`/book/${aItem._id}`}>
          <p className="title">{aItem.title}</p>
          <p className="author">{aItem.author}</p>
        </Link>
      </span>
      <FaTrash size={iconSize}
               onClick={deleteBook}
               onMouseEnter={startHover}
               onMouseLeave={endHover}/>
    </div>
  );
}