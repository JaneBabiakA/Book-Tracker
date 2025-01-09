import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useState } from "react";

export default function BookRow({aItem, setShouldReload}) {
  const [iconSize, setIconSize] = useState("");
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
    setIconSize(18);
  }

  const endHover = () => {
    setIconSize("");
  }

  return (
    <tr className="row">
      <td className="titleCell">
        <Link className="link" to={`/book/${aItem._id}`}>{aItem.title}</Link></td>
      <td className="cell">{aItem.author}</td>
      <td className="cell">{aItem.startDate ? new Date(aItem.startDate).toLocaleDateString() : null}</td>
      <td className="cell">{aItem.endDate ? new Date(aItem.endDate).toLocaleDateString() : null}</td>
      <td className="rowDelete">
        <FaTrash size={iconSize}
               onClick={deleteBook}
               onMouseEnter={startHover}
               onMouseLeave={endHover}/>
      </td>
    </tr>
  );
}