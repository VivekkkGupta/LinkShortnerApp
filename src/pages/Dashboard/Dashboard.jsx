import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Filter } from 'lucide-react'
import Error from '@/components/error'
import useFetch from '@/hooks/use-fetch'
import { UrlState } from '@/context/context'
import { getClicksForUrls } from '@/db/apiClicks'
import { getUrls } from '@/db/apiUrls'
import LinkCard from '@/components/link-card'
import CreateLink from '../../components/create-link'


function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = UrlState()

    // for urls
    const { loading: loadingUrls, error: loadingError, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);

    //for clicks
    const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrls, urls?.map((url) => url.id));

    useEffect(() => {
        fnUrls()
    }, [])

    const filteredUrls = urls?.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (urls?.length) fnClicks()
    }, [urls?.length])

    return (
        <div className='flex flex-col gap-4 p-8'>
            {loadingClicks || loadingUrls && <BarLoader width={"100%"} color='#36d7b7 ' />}
            <div className='grid grid-cols-2 gap-4'>

                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length || 0}</p>
                    </CardContent>
                </Card>
            </div>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-extrabold'>My Links</h1>
                <CreateLink />
            </div>
            <div className='relative'>
                <Input type="text" placeholder="Filter Links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <Filter className='absolute top-2 right-2 p-1' />
            </div>
            {loadingError && <Error message={loadingError.message || String(loadingError)} />}
            {(filteredUrls || []).map((url, id) => {
                return <LinkCard key={id} url={url} fetchUrls={fnUrls} />
            })}
        </div>
    )
}

export default Dashboard