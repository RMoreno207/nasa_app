import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="flex justify-center items-center">
      <article>
        <br></br>
        <hr></hr>
        <Link
          to={`https://nasa-app-client.vercel.app/landing/detail/${props.value.id}`}
        >
          <li className="text-xl m-1 p-1">{props.value.name}</li>
        </Link>
        <li>Mass: {props.value.mass}</li>
        <li>Class: {props.value.recclass}</li>
        <li>Year: {props.value.year ? props.value.year.slice(0, 4) : null}</li>
        <Link
          to={`https://nasa-app-client.vercel.app/landing/form/${props.value.id}`}
        >
          <button className="button1 text-xs bg-black mx-4 rounded p-1 m-2">
            Edit
          </button>
        </Link>
        <button
          onClick={props.delete}
          className="button1 text-xs bg-black mx-4 rounded p-1 m-2"
        >
          Delete
        </button>
      </article>
    </div>
  );
}

export default Card;
