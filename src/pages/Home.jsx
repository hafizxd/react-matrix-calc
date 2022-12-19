import { useEffect, useState } from "react";

import Header from "../components/Header";
import Title from "../components/Title";
import Button from "../components/Button";
import Matrix from "../components/Matrix";
import Action from "../components/Action";

const Home = () => {
    const [modeTwoMat, setModeTwoMat] = useState(false)
    const [firstMat, setFirstMat] = useState([...Array(3)].map(e => [...Array(3)]))
    const [secondMat, setSecondMat] = useState([...Array(3)].map(e => [...Array(3)]))
    const [outputMat, setOutputMat] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const addRow = (mat, setMat) => {
        let arr = mat.concat([[...Array(mat[0].length)]])
        setMat(arr)
    }

    const removeRow = (mat, setMat) => {
        if (mat.length <= 2) return

        setMat(mat.slice(0, -1))
    }

    const addCol = (mat, setMat) => {
        let arr = mat;
        for (let i = 0; i < mat.length; i++) {
            arr[i].push(undefined);
        }
        arr = mat.concat([])
        setMat(arr)
        // setMat(arr.slice(0, -1))
    }

    const removeCol = (mat, setMat) => {
        if (mat.length <= 2) return
        
        let arr = mat;
        for (let i = 0; i < mat.length; i++) {
            arr[i].pop();
        }
        arr = mat.concat([])
        setMat(arr)
    }

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
                    <div className="upper">
                        <Matrix matState={firstMat} setMatState={setFirstMat} />
                        <div className="btn-right">
                            <Button role="button" wrapped={true} onCickEvent={() => addCol(firstMat, setFirstMat)}>+</Button>
                            <Button role="button" wrapped={true} onCickEvent={() => removeCol(firstMat, setFirstMat)}>-</Button>
                        </div>
                    </div>
                    <div className="bottom">
                        <Button role="button" wrapped={true} onCickEvent={() => addRow(firstMat, setFirstMat)}>+</Button>
                        <Button role="button" wrapped={true} onCickEvent={() => removeRow(firstMat, setFirstMat)}>-</Button>
                    </div>
                </div>
                {modeTwoMat && 
                    <div className="card">
                        <div className="upper">
                            <Matrix matState={secondMat} setMatState={setSecondMat} />
                            <div className="btn-right">
                                <Button role="button" wrapped={true} onCickEvent={() => addCol(secondMat, setSecondMat)}>+</Button>
                                <Button role="button" wrapped={true} onCickEvent={() => removeCol(secondMat, setSecondMat)}>-</Button>
                            </div>
                        </div>
                        <div className="bottom">
                            <Button role="button" wrapped={true} onCickEvent={() => addRow(secondMat, setSecondMat)}>+</Button>
                            <Button role="button" wrapped={true} onCickEvent={() => removeRow(secondMat, setSecondMat)}>-</Button>
                        </div>
                    </div>
                }   
            </div>

            <div className="action-wrapper">
                <Action input={firstMat} input2={secondMat} setOutput={setOutputMat} setErr={setErrorMsg} isTwoMat={modeTwoMat} />
            </div>

            <div className="result-container">
                {(errorMsg != '' && outputMat.length == 0) && 
                    <div className="card">
                        <p>{errorMsg}</p>
                    </div>
                }

                {outputMat.length > 0 && 
                    <div className="card">
                        <Matrix matState={outputMat} setMatState={setOutputMat} isInput={false} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;
