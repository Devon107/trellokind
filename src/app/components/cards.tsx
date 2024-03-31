type CardProps = {
    title: string;
    description: string;
    href: string;
};
const Cards = ({ title, description, href }: CardProps) => {
    if(!title || !description || !href) return null
    return (
        <div className="bg-slate-600 p-4 mx-2 rounded">
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={href}>Read more</a>
        </div>
    );
};

export default Cards;