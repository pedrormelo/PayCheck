import React from "react";

const Text = ({
    children,
    className = "",
    as,

    ...restProps
}) => {
    const Component = as || "p";

    return (
        <Component className={` ${className} `} {...restProps}>
            {children}
        </Component>
    );
};

export { Text };