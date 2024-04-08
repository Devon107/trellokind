import { useState } from "react"

type Form = {
    onClick : (e: React.MouseEvent<HTMLElement>) => void
}
function Form({onClick} : Form) {
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
        
        setTitle("")
        setDescription("")
        setLink("")
    }

    return(
        <div className="bg-slate-600 p-4 mx-2 rounded w-[450px] height-[300px] flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
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