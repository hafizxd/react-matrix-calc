const Button = ({ as, children, filled, secondary, onCickEvent, ...rest }) => {
    return (
        <button
            className={`dir-control ${
                secondary ? "dir-control--secondary" : ""
            } ${filled ? "dir-control--filled" : ""}`}
            {...rest}
            onClick={onCickEvent}
        >
            {children}
            <span />
            <span />
            <span />
            <span />
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
        </button>
    );
};

export default Button