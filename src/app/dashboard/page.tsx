'use client'
import Cards from "../components/cards";
import Button from "../components/button";
import { useState } from "react";
const initialState = [{
    title: "",
    description: "",
    href: "",
},]
export default function Dashboard() {
    const [card, setCard] = useState(initialState)
    const handleClick = () => {
        setCard([...card, {title:"new card", description:"new description", href:"https://www.google.com"}])
    }
    return <>
        <h1>Welcome to the Dashboard</h1>
        <div className="grid grid-cols-3">
            <section className="bg-slate-800 p-4 mx-2 rounded flex flex-col gap-2">
                <h2>Todo</h2>
                {card.map((card) => (<Cards key={card.title} title={card.title} description={card.description} href={card.href}/>))}
            </section>
            <section className="bg-slate-800 p-4 mx-2 rounded">
                <h2>In Progress</h2>
                <Cards title="Card 2" description="Description of card 2" href="https://www.google.com"/>
            </section>
            <section className="bg-slate-800 p-4 mx-2 rounded">
                <h2>Done</h2>
                <Cards title="Card 3" description="Description of card 3" href="https://www.google.com"/>
            </section>
        </div>
        <Button title="Add card" className="bg-slate-800 p-4 m-2 rounded" onClick={() => { handleClick() }}/>
    </>
}