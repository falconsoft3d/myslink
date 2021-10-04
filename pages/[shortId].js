import React from 'react';
import { getUrlFromApi } from '../api/url';

export default function ShortIdPage() {
    return (
        <div>
            ShortId Redirect
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const { shortId } = params;
    const data = await getUrlFromApi(shortId);
    if(!data || !data.data) {
        return { redirect: { destination: '/' }};
    } else {
        return { redirect: { destination: data.data.url }}
    }
    
}