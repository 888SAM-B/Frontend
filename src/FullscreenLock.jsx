import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullscreenButton from "./FullscreenButton";

const FullscreenLock = () => {
  const navigate = useNavigate();

  // Function to enable fullscreen
  const enableFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // Function to prevent fullscreen exit by any means
  const checkFullscreen = () => {
    setTimeout(() => {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        enableFullscreen();
      }
    }, 100); // Slight delay to ensure fullscreen is properly detected
  };

  // Disable navigation gestures (for mobile)
  const disableGestures = () => {
    document.body.style.overscrollBehavior = "contain"; // Prevent pull-down refresh
    document.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false });
  };

  // Disable back button
  const disableBackButton = () => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      window.history.pushState(null, "", window.location.href);
    });
  };

  // Disable keyboard shortcuts
  const disableShortcuts = (event) => {
    if (event.key === "F11" || event.ctrlKey || event.altKey) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    enableFullscreen();
    disableGestures();
    disableBackButton();

    document.addEventListener("fullscreenchange", checkFullscreen);
    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      document.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

  // Function to unlock screen after submission
  const unlockScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    // Re-enable scrolling and gestures
    document.body.style.overscrollBehavior = "auto";
    document.removeEventListener("touchmove", (event) => event.preventDefault());

    // Navigate to another page after submission
    navigate("/assessment-result");
  };

  return (
    <div>
        <FullscreenButton/>
      <h2>Fullscreen Lock Enabled</h2>
      <button onClick={unlockScreen}>Submit & Exit Fullscreen</button>
    </div>
  );
};

export default FullscreenLock;
