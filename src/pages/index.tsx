import { useEffect } from "react";
import { useRouter } from "next/navigation";

const InitPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/contacts", { scroll: false });
  }, []);
};

export default InitPage;
