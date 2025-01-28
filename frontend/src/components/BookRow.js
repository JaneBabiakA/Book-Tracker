import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function BookRow({aItem, setShouldReload}) {
  const { token } = useAuthContext();
  const [iconSize, setIconSize] = useState("");
  const deleteBook = async () => {
    const res = await fetch('http://localhost:8080/api/books/' + aItem._id, {
      method:'DELETE',
      headers : {
        'Authorization' : `Bearer ${token}`
    }
    });
    await res.json();
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
        <Link className="link" to={`/${aItem._id}`}>{aItem.title}</Link></td>
      <td className="cell">{aItem.author}</td>
      <td className="cell">{aItem.startDate ? new Date(aItem.startDate).toISOString().split('T')[0] : null}</td>
      <td className="cell">{aItem.endDate ? new Date(aItem.endDate).toISOString().split('T')[0] : null}</td>
      <td className="rowDelete">
        <FaTrash size={iconSize}
               onClick={deleteBook}
               onMouseEnter={startHover}
               onMouseLeave={endHover}/>
      </td>
    </tr>
  );
}