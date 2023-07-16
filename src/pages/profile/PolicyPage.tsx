import ReactNotion from '@/utils/reactNotion';
export default function PolicyPage() {
    const notionId = import.meta.env.VITE_POLICY_NOTION;
    return <div className="w-full px-5">{ReactNotion(notionId)}</div>;
}
