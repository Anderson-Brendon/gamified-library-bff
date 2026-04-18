"use client"

import { useRef, useState } from "react";

export function PfdDownloader({ pdfUrl, pdfName }: { pdfUrl: string, pdfName: string }) {

    enum status {
        "pending",
        "started",
        "finished"
    }

    const [downloadStatus, setDownloadStatus] = useState(status.pending);

    const anchor = useRef<HTMLAnchorElement>(null);

    const handlePdfDownload = async (target: HTMLButtonElement) => {
        let url = '';

        try {
            target.disabled = true;

            setDownloadStatus(status.started);

            const res = await fetch(pdfUrl);
            const blob = await res.blob();
            url = window.URL.createObjectURL(blob);

            if (anchor.current) {
                anchor.current.href = url;

                anchor.current.download = pdfName;

                setDownloadStatus(status.finished);

                anchor.current.click();
            }

        } catch (error) {
            console.log(error)
        } finally {
            target.disabled = false;
            window.URL.revokeObjectURL(url);
        }

    }

    return (
        <div>
            {(downloadStatus == status.pending || downloadStatus == status.finished) && <button onClick={(e) => { handlePdfDownload(e.currentTarget) }} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                Download
            </button>}
            <a ref={anchor} href={""}></a>
            {downloadStatus == status.started.valueOf() && <svg className="mx-auto size-8 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}

        </ div>
    )
}