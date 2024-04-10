import { motion } from "framer-motion";
import DropIndicator from "./dropindicator";
import card from "../constants/Card"
type Cards = {
    title: string;
    id: string;
    column: string;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: card) => void;
}
const Card = ({ title, id, column, handleDragStart }: Cards) => {
    return (
        <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
            layout
            layoutId={id}
            draggable="true"
            onDragStart={(e : any) => handleDragStart(e, { title, id, column })}
            className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
            <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
        </>
    )
}
export default Card