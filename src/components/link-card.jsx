import { Copy, Download, Trash } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import useFetch from '@/hooks/use-fetch';
import { BeatLoader } from 'react-spinners';
import { deleteUrl } from '@/db/apiUrls';

function LinkCard({ url, fetchUrls }) {
    const SITE_URL = import.meta.env.VITE_SITE_URL;

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id)
    return (
        <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
            <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
                <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
                <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>{`${SITE_URL}${url?.custom_url ? url?.custom_url : url.short_url}`}</span>
                <span className='flex items-center gap-1 hover:underline cursor-pointer'>{url?.original_url}</span>
                <span className='flex items-end font-extralight text-sm flex-1'>{new Date(url?.created_at).toLocaleString()}</span>
            </Link>
            <div className='flex gap-2'>
                <Button onClick={() => navigator.clipboard.writeText(`${SITE_URL}${url?.custom_url ? url?.custom_url : url.short_url}`)}>
                    <Copy variant="ghost" />
                </Button>
                <Button onClick={downloadImage} >
                    <Download variant="ghost" />
                </Button>
                <Button onClick={() => fnDelete().then(() => fetchUrls())}>
                    {loadingDelete ? <BeatLoader size={5} color='white' /> : <Trash variant="ghost" />}
                </Button>
            </div>
        </div>
    )
}

export default LinkCard