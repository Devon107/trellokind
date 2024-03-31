'use client'
type ButtonProps = {
    title: string
    className: string
    onClick: () => void
}
export default function Button({ title, className, onClick }: ButtonProps) {
    return <button className={className} onClick={onClick}>{title}</button>
}