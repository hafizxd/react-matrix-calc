import { useState } from "react";
import Button from "./Button";

const Action = ({ input, input2, setOutput, setErr, isTwoMat }) => {
    const [kScalar, setKScalar] = useState(0)
    
    // Dua Matrix
    const Add = () => {
        if (input.length != input2.length || input[0].length != input2.length) {
            setOutput([])
            return setErr('Kolom dan Baris harus sama')
        }

        let result = [...Array(input.length)].map(e => [...Array(input[0].length)]);

        for (let i =0; i<input.length; i++) {
            for (let j=0; j<input[0].length; j++) {
                if (typeof(input[i][j]) == 'undefined' || typeof(input2[i][j]) == 'undefined') {
                    setOutput([])
                    return setErr('Isikan semua field')
                }

                result[i][j] = Math.round((parseFloat(input[i][j]) + parseFloat(input2[i][j]))*100)/100;
            }
        }
        
        setOutput(result)
    }

    const Substract = () => {
        if (input.length != input2.length || input[0].length != input2.length) {
            setOutput([])
            return setErr('Kolom dan Baris harus sama')
        }

        let result = [...Array(input.length)].map(e => [...Array(input[0].length)]);

        for (let i =0; i<input.length; i++) {
            for (let j=0; j<input[0].length; j++) {
                if (typeof(input[i][j]) == 'undefined' || typeof(input2[i][j]) == 'undefined') {
                    setOutput([])
                    return setErr('Isikan semua field')
                }

                result[i][j] = Math.round((parseFloat(input[i][j]) - parseFloat(input2[i][j]))*100)/100;
            }
        }
        
        setOutput(result)
    }

    const Multiply = () => {
        if (input[0].length != input2.length) {
            setOutput([])
            return setErr('Kolom Matriks 1 dan Baris Matriks 2 harus sama')
        }

        let result = [...Array(input.length)].map(e => [...Array(input2[0].length)]);
		
		for (let i=0; i<input.length; i++) {
			for (let j=0; j<input2[0].length; j++) {
                result[i][j] = 0;

                for (let k=0; k<input[0].length; k++) {
                    if (typeof(input[i][k]) == 'undefined' || typeof(input2[k][j]) == 'undefined') {
                        setOutput([])
                        return setErr('Isikan semua field')
                    }

                    result[i][j] += input[i][k] * input2[k][j];
                }
                
                result[i][j] = Math.round(result[i][j]*100)/100;
			}
		}

        setOutput(result)
    }


    // Satu Matriks
    const Transpose = () => {
        let result = [...Array(input[0].length)].map(e => [...Array(input.length)]);

		for(let i = 0; i < input.length; i++) {
			for(let j = 0; j < input[0].length; j++) {
				result[j][i] = input[i][j];
			}
		}

		setOutput(result)
    }

    const Determinant = () => {
        if (input.length !== input[0].length) {
            setOutput([])
            return setErr('Baris dan Kolom Matriks harus sama')
        }

        let result = countDeterminant(input);
        setOutput([])
        return setErr('Hasil Determinan Matriks adalah ' + result)
    }

    const countDeterminant = (mat) => {
        if (mat.length == 2) {
          return input[0][0] * input[1][1] - input[0][1] * input[1][0]
        }
    
        const parts = input[0].map((coef, index) => {
          const matrixRows = mat.slice(1).map(row => [ ...row.slice(0, index), ...row.slice(index + 1)])
          const result = coef * countDeterminant(matrixRows)
          return index % 2 === 0 ? result : -result
        })
    
        
        let res = 0;
        parts.forEach((val) => {
            res += val
        })

        return res;
    }

    const swap = (input, row1 , row2 , col) => {
        for (let i = 0; i < col; i++)
        {
            var temp = input[row1][i];
            input[row1][i] = input[row2][i];
            input[row2][i] = temp;
        }
    }

    const Rank = () => {
        let rank = input.length;
        let R = input.length;
        let reduce = false;

        for (let row = 0; row < rank; row++)
        {
            if (input[row][row] != 0)
            {
                for (let col = 0; col < R; col++)
                {
                    if (col != row) {
                        let mult = input[col][row] / input[row][row];
                        
                        for (let i = 0; i < rank; i++) {
                            input[col][i] -= mult * input[row][i];
                        }
                    }
                }
            }
            else
            {
                reduce = true;

                for (let i = row + 1; i < R; i++)
                {
                    if (input[i][row] != 0)
                    {
                        swap(input, row, i, rank);
                        reduce = false;
                        break;
                    }
                }

                if (reduce)
                {
                    rank--;

                    for (let i = 0; i < R; i ++)
                        input[i][row] = input[i][rank];
                }

                row--;
            }
        }

        setOutput([]);
        setErr('Rank Matriks adalah : ' + rank);
    }

    const Scalar = () => {
        if (typeof(kScalar) == 'undefined' || kScalar == '') {
            setOutput([])
            return setErr('Skalar harus diisi')
        }

        let result = [...Array(input.length)].map(e => [...Array(input[0].length)]);
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                result[i][j] = kScalar * input[i][j]
            }
        }

        setOutput(result)
    }

    return (
        <>
            {
                isTwoMat ?
                <>
                    <Button role="button" onCickEvent={() => Add()} > Tambah </Button>
                    <Button role="button" onCickEvent={() => Substract()} > Kurang </Button>
                    <Button role="button" onCickEvent={() => Multiply()} > Kali </Button>
                </>
                :
                <>
                    <div className="scalar">
                        <Button role="button" onCickEvent={() => Scalar()} > Skalar </Button>
                        <input type="text" inputMode="numeric" value={kScalar} onChange={((e) => setKScalar(e.target.value))} />
                    </div>
                    <Button role="button" onCickEvent={() => Transpose()} > Transpose </Button>
                    <Button role="button" onCickEvent={() => Determinant()} > Determinan </Button>
                    <Button role="button" onCickEvent={() => Rank()} > Rank </Button>
                </>
            }
        </>
    );
};

export default Action;
