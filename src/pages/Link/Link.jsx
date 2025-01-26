import React, { useEffect, useState } from 'react'
import { UrlState } from '@/context/context';
import { useNavigate, useParams } from 'react-router-dom';
import { getUrl } from '@/db/apiUrls';
import { getClicksForUrl } from '@/db/apiClicks';
import { deleteUrl } from '@/db/apiUrls';
import { BarLoader, BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LocationStats from '@/components/location-stats';
import DeviceStats from '@/components/device-stats';

function Link() {
    const navigate = useNavigate()
    const { user } = UrlState()
    const { id } = useParams()

    const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id })

    const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id)

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id)

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

    useEffect(() => {
        fn()
        fnStats()
    }, [])

    if (error) {
        navigate('/dashboard')
    }

    let link = ""
    if (url) {
        link = url?.custom_url ? url?.custom_url : url.short_url
    }
    const SITE_URL = import.meta.env.VITE_SITE_URL;

    return (
        <>
            {(loading || loadingStats) && (
                <BarLoader className='mb-4' width={"100%"} color='#36d7b7 ' />
            )}
            <div className='flex flex-col gap-8 sm:flex-row justify-between'>
                <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
                    <span className='text-6xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
                    <a href={`${SITE_URL}${link}`} target='_blank'
                        className='text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer'>
                        {SITE_URL}{link}
                    </a>
                    <a href={url?.original_url} target='_blank'
                        className='flex items-center gap-1 hover:underline cursor-pointer'>
                        <LinkIcon className="p-1" />
                        {url?.original_url}
                    </a>
                    <span className='flex items-end font-extralight text-sm'>{new Date(url?.created_at).toLocaleString()}

                    </span>
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
                    <img src={url?.qr} alt={`qr-${url?.title}`} className='w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain' />
                </div>
                <div className='sm:w-3/5'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
                        </CardHeader>
                        {stats && stats?.length ? (
                            <CardContent className="flex flex-col gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Clicks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{stats?.length || 0}</p>
                                    </CardContent>
                                </Card>
                                <CardTitle>Location Data</CardTitle>
                                <LocationStats stats={stats} />
                                <CardTitle>Device Info</CardTitle>
                                <DeviceStats stats={stats} />


                            </CardContent>
                        ) : (
                            <CardContent>
                                {loadingStats === false ? "No Statistics yet" : "Loading Statistics..."}
                            </CardContent>
                        )
                        }
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Link