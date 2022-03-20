import type { FC } from "react";
import { useQuery } from "react-query";
import { privateApi } from "../api";

const Dashboard: FC = () => {
  const {
    data: hashes,
    isError,
    isLoading,
    refetch,
  } = useQuery("get-hashes", async () => {
    const res = await privateApi.get("/api/v1/hash");

    return res.data.data.hashes;
  });

  return (
    <div className="px-8 md:px-0 py-10 max-w-[80%] mx-auto">
      <header>
        <h1 className="text-xl">Dashboard</h1>
      </header>
      <section className="my-8">
        {isLoading ? (
          <div className="text-3xl">Loading available hashes...</div>
        ) : isError ? (
          <div className="text-3xl">Some error occured. Please try again</div>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Available links</h2>
            <div className="my-8 grid grid-cols-3 gap-4">
              <div className="font-bold text-2xl pb-2 border-b">
                Hashed Link
              </div>
              <div className="font-bold text-2xl pb-2 border-b">
                Original Link
              </div>
              <div className="font-bold text-2xl pb-2 border-b">
                # of Clicks
              </div>
              {hashes.map((hash: any) => (
                <>
                  <div className="text-lg">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/h/${hash.hash}`}
                    >{`${import.meta.env.VITE_API_URL}/h/${hash.hash}`}</a>
                  </div>
                  <div className="text-lg">
                    <a href={hash.originalUrl}>{hash.originalUrl}</a>
                  </div>
                  <div className="text-lg">{hash.clicks}</div>
                </>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
