import { Clock } from "lucide-react";
import { useEffect , useState } from "react";

const DealCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(
    8 * 60 * 60 + 45 * 60 + 32
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const countdown = `${String(hours).padStart(2, "0")} : ${String(
    minutes
  ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-1.5">
      <Clock
        size={12}
        strokeWidth={2.5}
        className="text-[#FF6B6B]"
      />

      <span className="font-['Poppins'] text-[10px] font-medium text-[#FF6B6B] sm:text-[11px]">
        Ends in {countdown}
      </span>
    </div>
  );
};

export default DealCountdown;