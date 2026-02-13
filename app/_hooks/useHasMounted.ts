'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => { }

/**
 * Custom hook to detect if the component has mounted on the client.
 * Uses useSyncExternalStore for a performance-optimized hydration check
 * that avoids "cascading render" warnings in React 18.
 */
export function useHasMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}
