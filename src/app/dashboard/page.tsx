'use client'
import Cards from "../components/cards";
import Button from "../components/button";
import Form from "../components/form";
import { useState } from "react";

interface Card {
    id: number;
    title: string;
    description: string;
    href: string;
    status: string;
}

export default function Dashboard() {
    const [card, setCard] = useState<Card[]>([]);
    const [dropIndicator, setDropIndicator] = useState<string | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setShowForm(!showForm)
    }
    const handleDragStart = (event: React.DragEvent<HTMLElement>, cardId: number) => {
        event.dataTransfer.setData("text/plain", cardId.toString())
    }
    const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.clearData()
        setDropIndicator(null)
    }
    const handleDrop = (event: React.DragEvent<HTMLElement>, status : string) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain")
        const newcard = card?.find((_card) => +_card.id === +cardId)
        if(newcard){
            newcard.status = status
            setCard((prevCard) => 
                prevCard?.map((_card) => (_card.id === newcard.id ? newcard : _card))
            )
        }
        setDropIndicator(null)
    }
    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setDropIndicator(event.currentTarget.id)
    }
    const renderCard = (status: string) => {
        return card?.filter(
            (_card) => _card.status === status
        ).map((_card) => (
        <Cards 
            key={_card.id}
            id={_card.id}
            title={_card.title} 
            description={_card.description} 
            href={_card.href} 
            status={_card.status}
            onDragStart={(event:any) => handleDragStart(event, _card.id)}
            onDragEnd={handleDragEnd}
        />
        ))
    }
    return <>
        <h1>Welcome to the Dashboard</h1>
        <div className="grid grid-cols-3">
            <h2>Todo</h2>
            <h2>In Progress</h2>
            <h2>Done</h2>
            <section id="todo" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "todo")} className="bg-slate-800 p-4 mx-2 rounded flex flex-col gap-2">
                {renderCard("todo")}
            </section>
            <section id="in-progress" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "in-progress")}  className="bg-slate-800 p-4 mx-2 rounded flex flex-col gap-2">
                {renderCard("in-progress")}
            </section>
            <section id="done" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "done")}  className="bg-slate-800 p-4 mx-2 rounded flex flex-col gap-2">
                {renderCard("done")}
            </section>
        </div>
        <Button title="Add card" className="bg-slate-800 p-4 m-2 rounded" onClick={(e) => { handleClick(e) }}/>
        {showForm && <section onClick={(e) => { handleClick(e) }} className="w-full h-full bg-slate-800/80 grid place-content-center absolute top-0">
            <Form card={card} setCard={setCard} showForm={showForm} setShowForm={setShowForm}/>
        </section>}
    </>
}