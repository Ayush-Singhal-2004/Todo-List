import { useEffect, useState } from "react";

export default function Todo({title, description, count}) {

    const handleDeleteBtn = () => {
        fetch("http://localhost:8000/todo/remove", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "title" : title,
                "description" : description
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data);
            count.countFn(count.countVar-1);
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div className="todo h-52 shadow-xl flex flex-col justify-center pl-6 gap-4">
            <h1 className="text-2xl">{title}</h1>
            <p className="">{description}</p>
            <button className="bg-red-500 text-white h-8 w-20 rounded-sm hover:bg-red-600" onClick={handleDeleteBtn}>Delete</button>
        </div>
    )
}