import { useRef, useEffect } from "react";

const ScrollToBottom = ({dependence}) => {
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [dependence]);

    return (
        <div ref={scrollRef}></div>
    )
}

export default ScrollToBottom;