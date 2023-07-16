import ReactNotion from '@/utils/reactNotion';
export default function TermsPage() {
    const notionId = import.meta.env.VITE_TERMS_NOTION;
    return <div className="w-full px-5">{ReactNotion(notionId)}</div>;
}
