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
    const [dragIndicator, setDragIndicator] = useState<string | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [isDragged, setIsDragged] = useState<boolean>(false)
    const [dragSize, setDragSize] = useState({
        w: 0,
        h: 0,
    });
    const [{ dx, dy }, setOffset] = useState({
        dx: 0,
        dy: 0,
    });
    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setShowForm(!showForm)
    }
    const handleDragStart = (event: any, cardId: number) => {
        setIsDragged(true)
        setDragIndicator(cardId.toString())
        const section = document.createElement("div");
        section.id = "section";
        section.classList.add("ghost-"+cardId);
        section.classList.add("dragging--hidden");
        document.body.appendChild(section);
        event.dataTransfer.setDragImage(section, 0, 0);
        event.dataTransfer.setData("section", cardId.toString())
        const section1 = event.currentTarget;
        section1.style.border = "1px solid";
        setOffset ({
            dx: event.clientX,
            dy: event.clientY,
        })
        setDragSize({
            w: section1.offsetWidth,
            h: section1.offsetHeight
        })
        const handleDrag = (event: any) => {
            setOffset({
                dx: event.clientX,
                dy: event.clientY,
            })
        }
        const handleDragEnd2 = () => {
            section1.removeEventListener('drag', handleDrag);
            section1.removeEventListener('dragend', handleDragEnd);
            section.remove();
            setIsDragged(false);
        };
        section1.addEventListener("drag", handleDrag);
        section1.addEventListener("dragend", handleDragEnd2);
    }
    const handleDragEnd = (event: any) => {
        setIsDragged(false)
        event.dataTransfer.clearData()
        setDropIndicator(null)
        const section1 = event.currentTarget;
        section1.style.border = "none";
    }
    const handleDrop = (event: any, status : string) => {
        event.preventDefault();
        const section = document.getElementById("section");
        if(section) section.remove();
        const cardId = event.dataTransfer.getData("section")
        const newcard = card?.find((_card) => +_card.id === +cardId)
        if(newcard){
            newcard.status = status
            setCard((prevCard) => 
                prevCard?.map((_card) => (_card.id === newcard.id ? newcard : _card))
            )
        }
        setDropIndicator(null)
    }
    const handleDragOver = (event: any) => {
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
            isDragged={isDragged}
            dx={dx}
            dy={dy}
            dragSize={dragSize}
            dragIndicator={dragIndicator}
        />
        ))
    }
    return <>
        <h1>Welcome to the Dashboard</h1>
        <div className="grid grid-cols-3">
            <h2>Todo</h2>
            <h2>In Progress</h2>
            <h2>Done</h2>
            <section id="todo" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "todo")} className={`p-4 mx-2 rounded flex flex-col gap-2 ${dropIndicator === "todo" ? "bg-slate-700" : "bg-slate-800"}`}>
                {renderCard("todo")}
            </section>
            <section id="in-progress" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "in-progress")}  className={`p-4 mx-2 rounded flex flex-col gap-2 ${dropIndicator === "in-progress" ? "bg-slate-700" : "bg-slate-800"}`}>
                {renderCard("in-progress")}
            </section>
            <section id="done" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "done")}  className={`p-4 mx-2 rounded flex flex-col gap-2 ${dropIndicator === "done" ? "bg-slate-700" : "bg-slate-800"}`}>
                {renderCard("done")}
            </section>
        </div>
        <Button title="Add card" className="bg-slate-800 p-4 m-2 rounded" onClick={(e) => { handleClick(e) }}/>
        {showForm && <section onClick={(e) => { handleClick(e) }} className="w-full h-full bg-slate-800/80 grid place-content-center absolute top-0">
            <Form card={card} setCard={setCard} showForm={showForm} setShowForm={setShowForm}/>
        </section>}
    </>
}