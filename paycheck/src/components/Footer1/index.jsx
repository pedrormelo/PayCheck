import { Heading } from "./..";
import React from "react";

export default function Footer1({ ...props }) {
    return (
        <footer
            {...props}
            className = {`${props.className} flex justify-center items-center h-[40px] lg:h-auto md:h-auto mt-3 p-2` }
        >
            <div className = "flex h-[20px] items-center gap-2.5 lg:h-auto md:h-auto md: flex-col">
                <div className = "flex h-[20px] items-center lg:h-auto md:h-auto">
                    <Heading size="textxs" as="p" className = "h-[16px] w-auto text-[14px] font-medium !text-colors1">
                        Gerenciador de Contratos do GETI da Sec. de Saúde - Jaboatão dos Guararapes - Março de 2025 -{" "}
                    </Heading>
                </div>
                <Heading size="textxs" as="p" className = "h-[16px] text-[14px] font-medium !text-colors1">
                    Ver: 0.1.0{" "}
                </Heading>
            </div>
        </footer>
    );
}