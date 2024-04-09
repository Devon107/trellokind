type CardProps = {
    id: number;
    title: string;
    description: string;
    href: string;
    status: string;
    onDragStart: (event: any, cardId: number) => void;
    onDragEnd: (event: any) => void;
    isDragged: boolean;
    dx: number;
    dy: number;
    dragSize: {w: number, h: number};
    dragIndicator: string | null;
}
const Cards = ({ title, description, href, id, status, onDragStart, onDragEnd, isDragged, dx, dy, dragSize, dragIndicator}: CardProps) => {
    if(!id) return null
    return (
        <>
            <div className="bg-slate-600 p-4 mx-2 rounded cursor-grab active:cursor-grabbing" style={{zIndex: 2}} draggable onDragStart={(event:any) => onDragStart(event, id)} onDragEnd={onDragEnd}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={href && ""}>Read more</a>
                <p>Status: {status}</p>
            </div>
            {isDragged && 
                <div className={`ghost-${id} bg-slate-600 p-4 mx-2 rounded ${dragIndicator === id.toString() ? "block" : "hidden"}`} style={{
                    position: "absolute",
                    transform: `translate(${dx}px, ${dy}px)`,
                    height: `${dragSize.h}px`,
                    width: `${dragSize.w}px`,
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <a href={href && ""}>Read more</a>
                    <p>Status: {status}</p>
                </div>
            }
        </>
    );
};

export default Cards;