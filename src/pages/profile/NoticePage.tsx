import ReactNotion from '@/utils/reactNotion';
export default function NoticePage() {
    return (
        <div className="w-full px-5">
            {/* TODO 노션 페이지 연동 */}
            {ReactNotion('43d354ae6c504f259fd434668be9cef1')}
        </div>
    );
}
