import { useEffect } from "react";

function useEventListener(object, eventName, callback) {
    useEffect(() => {
        object?.addEventListener && object.addEventListener(eventName, callback);

        return () => object?.removeEventListener && object.removeEventListener(eventName, callback);
    }, [object, eventName, callback]);
}

export default useEventListener;
