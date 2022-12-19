import { useEffect, useState } from "react";

import Header from "../components/Header";
import Title from "../components/Title";
import Button from "../components/Button";

const Home = () => {
    const [modeTwoMat, setModeTwoMat] = useState(false)
    const [firstMat, setFirstMat] = useState([...Array(3)].map(e => [...Array(3)]))

    return (
        <div className="background">
            <Header />
            <Title />

            <div className="btn-wrapper">
                <Button role="button" filled={!modeTwoMat} onCickEvent={() => setModeTwoMat(false)}>Satu Matrix</Button>
                <Button role="button" filled={modeTwoMat} onCickEvent={() => setModeTwoMat(true)}>Dua Matrix</Button>
            </div>

            <div className="container">
                <div className="card">
                    <table>
                        <tbody>
                            {firstMat.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        {val.map((val2, key2) => {
                                            return (
                                                <td key={key2}>
                                                    <input 
                                                        type="text" 
                                                        value={val2} 
                                                        // onChange={(e) => {
                                                        //     setFirstMat([
                                                        //         ...firstMat,
                                                        //         key => [
                                                        //             ...val,
                                                        //             key2 => e
                                                        //         ]
                                                        //     ])
                                                        //     console.log(firstMat)
                                                        // }
                                                        // } 
                                                    />
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
