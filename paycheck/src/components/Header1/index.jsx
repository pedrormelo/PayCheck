import { Heading } from "./..";
import React from "react";

export default function Header1({ ...props }) {
    return (
        <header
            {...props}
            className = {`${props.className} flex justify-center items-center items-center h-[64px] lg:h-auto md:h-auto pt-3 pb-[18px] px3`}
        >
            <div className = "flex h-[36px] flex-row items-end justify-center gap-5 lg:h-auto md:h-auto">
                <Heading
                    size="textlg"
                    as="p"
                    className = "h-[28px] cursor-pointer text-[24px] font-medium !text-colors1 lg:text-[20px]"
                >
                    STOCK
                </Heading>
                <div className = "h-[36px] w-[2px]" />
                <Heading
                    size="textlg"
                    as="p"
                    className = "inline h-[28px] cursor-pointer text-[24px] font-medium !text-colors1 lg:text-[20px]"
                >
                    SysTab
                </Heading>
            </div>
        </header>
    );
}