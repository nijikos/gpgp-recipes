import { useEffect } from "react";

function useSmoothScroll() {
  // Define a function to scroll to the target element smoothly
  const smoothScrollTo = (element: any) => {
    const targetElement = document.getElementById(element);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Define a click handler that calls the smoothScrollTo function
  const handleClick = (elementId: string) => {
    smoothScrollTo(elementId);
  };

  // Attach an event listener to the document to handle smooth scrolling
  useEffect(() => {
    const handleScrollClick = (event: any) => {
      const { target } = event;

      if (target.dataset.scrollTarget) {
        const elementId = target.dataset.scrollTarget;
        handleClick(elementId);
      }
    };

    document.addEventListener("click", handleScrollClick);

    return () => {
      document.removeEventListener("click", handleScrollClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return handleClick;
}

export default useSmoothScroll;
