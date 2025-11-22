
import { Spinner } from "../ui/spinner";

export const BackDrop = () => {
  return (
    <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-40">
      <Spinner className="size-10" />
    </div>
  );
};
