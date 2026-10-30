"use client";

import { useEffect, useState } from "react";

export interface AsyncResource<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  retry: () => void;
}

interface AsyncResourceOptions<T> {
  /** Synchronous in-memory value, so an already-loaded resource paints without a loading frame. */
  peek?: (key: string) => T | null;
  /** Runs before retrying (evict a failed cache entry, reload a stale tab, …). */
  onRetry?: (key: string, error: Error | null) => void;
}

/**
 * One keyed loader for every lazy client resource: cancels stale loads, keeps a
 * previous key's payload from leaking into the next render, and exposes retry.
 */
export function useAsyncResource<T>(
  key: string,
  load: (key: string) => Promise<T>,
  options?: AsyncResourceOptions<T>
): AsyncResource<T> {
  const peek = options?.peek;
  const onRetry = options?.onRetry;
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    key: string;
    data: T | null;
    error: Error | null;
    loading: boolean;
  }>(() => {
    const cached = peek ? peek(key) : null;
    return { key, data: cached, error: null, loading: cached === null };
  });

  useEffect(() => {
    let cancelled = false;
    const cached = peek ? peek(key) : null;
    if (cached !== null) {
      setState((prev) =>
        prev.key === key && prev.data === cached && prev.error === null && !prev.loading
          ? prev
          : { key, data: cached, error: null, loading: false }
      );
      return () => {
        cancelled = true;
      };
    }
    setState((prev) =>
      prev.key === key && prev.data === null && prev.error === null && prev.loading
        ? prev
        : { key, data: null, error: null, loading: true }
    );
    load(key)
      .then((data) => {
        if (!cancelled) setState({ key, data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            key,
            data: peek ? peek(key) : null,
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key, attempt, load, peek]);

  const current =
    state.key === key
      ? state
      : { key, data: peek ? peek(key) : null, error: null, loading: !peek || peek(key) === null };

  return {
    data: current.data,
    error: current.error,
    loading: current.loading,
    retry: () => {
      onRetry?.(key, current.error);
      setAttempt((value) => value + 1);
    },
  };
}
