import type React from "react";
import Header from "./header";
import Footer from "./footer";
import Logo from "./logo";

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Header />

            <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    <div className="mb-6 text-center">
                        <Logo />
                    </div>

                    {title && (
                        <div className="max-w-3xl mx-auto mb-6">
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                    )}

                    {children}
                </div>
            </div>

            <Footer />
        </main>
    );
}
