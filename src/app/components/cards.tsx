type CardProps = {
    id: number;
    title: string;
    description: string;
    href: string;
    status: string;
    onDragStart: (event: React.DragEvent<HTMLDivElement>, cardId: number) => void;
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}
const Cards = ({ title, description, href, id, status, onDragStart, onDragEnd}: CardProps) => {
    if(!id) return null
    return (
        <div className="bg-slate-600 p-4 mx-2 rounded" draggable onDragStart={(event:any) => onDragStart(event, id)} onDragEnd={onDragEnd}>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={href && ""}>Read more</a>
            <p>Status: {status}</p>
        </div>
    );
};

export default Cards;