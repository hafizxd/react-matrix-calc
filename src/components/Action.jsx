import Button from "./Button";

const Action = ({ input, input2, setOutput, setErr, isTwoMat }) => {
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
    const Rank = () => {
        let rank = input[0].length;
		let row = input.length;
		let mat = input;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (let col = 0; col < input.length; col++) { 
				   if (col != row) { 
					 let mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (let i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				let reduce = true; 
				for (let i = row + 1; i < input.length;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						let aux = mat[row];
						mat[row] = mat[i];
						mat[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (let i = 0; i < input.length; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 

        setOutput([]);
        setErr('Rank Matriks adalah : ' + rank);
    }

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
          return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
        }
    
        const parts = mat[0].map((coef, index) => {
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
                    <Button role="button" onCickEvent={() => Rank()} > Rank </Button>
                    <Button role="button" onCickEvent={() => Transpose()} > Transpose </Button>
                    <Button role="button" onCickEvent={() => Determinant()} > Determinan </Button>
                </>
            }
        </>
    );
};

export default Action;
