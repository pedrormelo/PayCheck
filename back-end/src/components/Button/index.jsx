import React from "react";
import PropTypes from "prop-types";

const shapes = {
    round: "rounded-[18px]",
};

const variants = {
    fill: {},
};

const sizes = {
    "2xl": "h-[64px] px-[34px] text-[24px]",
    sm: "h-[38px] px-2.5",
    xs: "h-[34px] px-1",
    lg: "h-[48px] px-1",
    xl: "h-[54px] px-3.5",
    md: "h-[38px] px-5 text-[24px]",
};

const Button = ({
    children,
    className = "",
    leftIcon,
    rightIcon,
    shape,
    variant = "fill",
    size = "md",
    color = "black_900",
    ...restProps
}) => {
    return (
        <button
            className ={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
            {...restProps}
        >
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

Button.PropTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    shape: PropTypes.oneOf(["round"]),
    size: PropTypes.oneOf(["2xl", "sm", "xs", "lg", "xl", "md"]),
    variant: PropTypes.oneOf(["fill"]),
    color: PropTypes.oneOf(["blue_gray_100", "black_900", "black_900_01"]),
};

export { Button };