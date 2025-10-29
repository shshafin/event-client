import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
