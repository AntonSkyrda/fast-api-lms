import { useEffect } from "react";

export default function usePageTitle(title: string) {
  useEffect(
    function () {
      document.title = `${import.meta.env.VITE_BASE_SITE_TITLE} | ${title}`;
    },
    [title],
  );
}
