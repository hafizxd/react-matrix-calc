const Matrix = ({matState, setMatState, isInput=true}) => {
    return (
        <table>
            <tbody>
                {matState.map((val, key) => {
                    return (
                        <tr key={key}>
                            {val.map((val2, key2) => {
                                return (
                                    <td key={key2}>
                                        <input
                                            type="text"
                                            value={val2}
                                            disabled={!isInput}
                                            onChange={(e) => {
                                                let arr = matState.map(
                                                    (a, k1) => {
                                                        if (k1 == key)
                                                            return a.map(
                                                                (b, k2) =>
                                                                    k2 == key2
                                                                        ? e
                                                                                .target
                                                                                .value
                                                                        : b
                                                            );
                                                        return a;
                                                    }
                                                );

                                                setMatState(arr);
                                            }}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Matrix