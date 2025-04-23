import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true,
) {
  const ref = useRef<T>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent): void {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}

export function useOutsideClickWithContainer<
  T extends HTMLElement = HTMLElement,
  C extends HTMLElement = HTMLElement,
>(handler: () => void, listenCapturing: boolean = true) {
  const ref = useRef<T>(null);
  const containerRef = useRef<C>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent): void {
        if (
          ref.current &&
          !ref.current.contains(e.target as Node) &&
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return { ref, containerRef };
}
