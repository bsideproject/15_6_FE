import { useEffect, useRef } from 'react';

export function useEffectAfterMount(cb: () => void, dependencies: any[]) {
    const justMounted = useRef(true);

    useEffect(() => {
        if (!justMounted.current) {
            return cb();
        }
        justMounted.current = false;
    }, dependencies);
}
