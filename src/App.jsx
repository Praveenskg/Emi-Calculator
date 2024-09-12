import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar"
import EmiForm from "./Components/EmiForm";
import { useEffect, useState } from "react";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="  flex-1 flex-row">
        <div className="flex flex-1 flex-row">
          <div className="flex flex-1 flex-col overflow-y-auto mx-1">
            <div className="relative flex flex-1 md:px-[300px] md:pt-36 pt-16">
              <EmiForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App