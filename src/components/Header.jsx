import { useEffect, useState } from "react";

const Header = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const startTime = setInterval(() => {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            let time = h + ":" + m + ":" + s;
            setTime(time);
            var t = setTimeout(startTime, 500);
        }, 500)

        const checkTime = i => {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        const showDate = () => {
            var today = new Date();
            var options = {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
            };
            let date = today.toLocaleDateString(
                "id-ID",
                options
            );
    
            setDate(date);
        }

        showDate()
        return () => clearInterval(startTime)
    });

    return (
        <header>
            <div className="date" id="date">
                {date}
            </div>
            <div className="time" id="time">
                {time}
            </div>
        </header>
    )
}

export default Header