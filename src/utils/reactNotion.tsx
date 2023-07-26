import axios from 'axios';
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';
import 'react-notion/src/styles.css';
// import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting

export default function ReactNotion(pageId: string) {
    const [response, setResponse] = useState({});
    const NOTION_PAGE_ID = pageId;

    useEffect(() => {
        axios.get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`).then(({ data }) => {
            setResponse(data);
        });
    }, []);

    return <NotionRenderer blockMap={response} fullPage={true} hideHeader />;
}
