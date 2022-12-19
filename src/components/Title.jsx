import { useEffect, useRef } from "react";
import Typed from "typed.js";

const Title = () => {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        var options = {
            strings: ["<strong>Matrix</strong> Calculator"],
            typeSpeed: 90,
            startDelay: 200,
            backSpeed: 90,
            showCursor: true,
        };

        typed.current = new Typed(el.current, options);

        return () => {
            typed.current.destroy();
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="text" ref={el}></div>
        </div>
    );
};

export default Title
