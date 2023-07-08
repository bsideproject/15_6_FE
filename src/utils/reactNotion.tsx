import axios from 'axios';
import { useState } from 'react';
import { NotionRenderer } from 'react-notion';
import { useEffectAfterMount } from '@/hooks/useEffectAfterMount';
import 'react-notion/src/styles.css';
// import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting

export default function ReactNotion(pageId: string) {
    const [response, setResponse] = useState({});
    const NOTION_PAGE_ID = pageId;

    useEffectAfterMount(() => {
        axios.get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`).then(({ data }) => {
            setResponse(data);
        });
    }, []);

    return <NotionRenderer blockMap={response} fullPage={true} hideHeader />;
}
