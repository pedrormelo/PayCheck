import React from "react";

const sizes = {
    textxs: "text-[14px] font-medium",
    texts: "text-[20px] font-medium lg:text-[17px]",
    textmd: "text-[22px] font-medium lg:text-[18px]",
    textlg: "text-[24px] font-medium lg:text-[20px] md:text-[22px]",
    textxl: "text-[26px] font-medium lg:text-[22px] md:text-[24px] sm:text-[22px]",
    headingxs: "text-[32px] font-semibold lg:text-[27px] md:text-[30px] sm:text-[28px]" ,
};

const Heading = ({ children, className = "", size = "headingxs", as, ...restProps }) => {
    const Component = as || "h6";

    return (
    <Component className={`text-colors font-kantumruypro ${className} ${sizes[size]}`} {...restProps}>
        {children}
    </Component>
    );
};

export { Heading };