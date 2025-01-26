/* eslint-disable react/prop-types */
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
const SITE_URL = import.meta.env.VITE_SITE_URL;

const LinkCard = ({ url = [], fetchUrls }) => {
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title; // Desired file name for the downloaded image

        // Fetch the image and create a blob
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create an anchor element
                const anchor = document.createElement("a");
                anchor.href = URL.createObjectURL(blob);
                anchor.download = fileName;

                // Append the anchor to the body
                document.body.appendChild(anchor);

                // Trigger the download by simulating a click event
                anchor.click();

                // Remove the anchor from the document
                document.body.removeChild(anchor);
            })
            .catch(error => console.error('Error downloading the image:', error));
    };

    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${SITE_URL}${url?.short_url}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
        });
    };


    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
            <img
                src={url?.qr}
                className="h-32 object-contain ring ring-blue-500 self-start"
                alt="qr code"
            />
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
                <span className="text-3xl font-extrabold hover:underline cursor-pointer">
                    {url?.title}
                </span>
                <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                    {SITE_URL}{url?.custom_url ? url?.custom_url : url.short_url}
                </span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer">
                    <LinkIcon className="p-1" />
                    {url?.original_url}
                </span>
                <span className="flex items-end font-extralight text-sm flex-1">
                    {new Date(url?.created_at).toLocaleString()}
                </span>
            </Link>
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="relative"
                >
                    <Copy />

                    {copied && <span className="absolute -bottom-6">Copied!</span>}
                </Button>
                <Button variant="ghost" onClick={downloadImage}>
                    <Download />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => fnDelete().then(() => fetchUrls())}
                    disable={loadingDelete}
                >
                    {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
                </Button>
            </div>
        </div>
    );
};

export default LinkCard;