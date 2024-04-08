import { useState } from "react"
type Form = {
    card: [] | any[]
    setCard: (card: [] | any[]) => void
    showForm: boolean
    setShowForm: (showForm: boolean) => void
}
function Form({card, setCard, showForm, setShowForm} : Form) {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [link, setLink] = useState<string>("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }
        if(e.target.name === "description"){
            setDescription(e.target.value)
        }
        if(e.target.name === "link"){
            setLink(e.target.value)
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if(title !== "" || description !== "" || link !== "")
        {
            setCard([...card, {id: card.length + 1, title: title, description: description, link: link, status: "todo"}])
            setTitle("")
            setDescription("")
            setLink("")
            setShowForm(!showForm)
        }
    }

    return(
        <div className="bg-slate-600 p-4 mx-2 rounded w-[450px] height-[300px] flex flex-col gap-2 relative" onClick={(e) => e.stopPropagation()}>
            <span onClick={(e) => setShowForm(!showForm)} className="absolute top-[-10px] right-[-5px] cursor-pointer rounded-full bg-slate-200 w-[25px] h-[25px] text-black flex items-center justify-center font-semibold text-center text-sm">X</span>
            <h3>Add new task</h3>
            <input type="text" className="bg-slate-800 p-4 m-2 rounded" onChange={(e) => handleInput(e)} name="title" value={title} placeholder="Title" required/>
            <input type="text" className="bg-slate-800 p-4 m-2 rounded" onChange={(e) => handleInput(e)} name="description" value={description} placeholder="Description" required/>
            <input type="text" className="bg-slate-800 p-4 m-2 rounded" onChange={(e) => handleInput(e)} name="link" value={link} placeholder="Link" required/>
            <input type="file"/>
            <button className="bg-slate-800 p-4 m-2 rounded" onClick={(e) => {handleClick(e)} }>Add</button>
        </div>
    )
}
export default Form