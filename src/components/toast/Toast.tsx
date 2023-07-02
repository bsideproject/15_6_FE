import toast from 'react-hot-toast';

// https://react-hot-toast.com
export const Toast = (message: string | React.ReactNode) => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } flex flex-col bg-gray-900 w-auto px-4 py-2 bottom-[116px] rounded-xl text-white`}
        >
            {message}
        </div>
    ));
};
