import { Children, FC } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
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

  const onDelete = async (hash: string) => {
    await privateApi.delete(`/api/v1/hash/${hash}`);
    toast.success("Link deleted");
    refetch();
  };

  return (
    <div className="px-8 md:px-0 py-10 max-w-[80%] mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-xl">Dashboard</h1>
        <Link
          to="link"
          className="text-lg font-medium px-4 py-2 bg-primary rounded"
        >
          Create
        </Link>
      </header>
      <Outlet context={refetch} />
      <section className="my-8">
        {isLoading ? (
          <div className="text-3xl">Loading available hashes...</div>
        ) : isError ? (
          <div className="text-3xl">Some error occured. Please try again</div>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Available links</h2>
            <div className="my-8 grid grid-cols-4 gap-4">
              <div className="font-bold text-2xl pb-2 border-b">
                Hashed Link
              </div>
              <div className="font-bold text-2xl pb-2 border-b">
                Original Link
              </div>
              <div className="font-bold text-2xl pb-2 border-b">
                # of Clicks
              </div>
              <div className="font-bold text-2xl pb-2 border-b">Actions</div>
              {Children.toArray(
                hashes.map((hash: any) => (
                  <>
                    <div className="text-lg break-words">
                      <a
                        href={`${import.meta.env.VITE_API_URL}/h/${hash.hash}`}
                      >{`${import.meta.env.VITE_API_URL}/h/${hash.hash}`}</a>
                    </div>
                    <div className="text-lg break-words">
                      <a href={hash.originalUrl}>{hash.originalUrl}</a>
                    </div>
                    <div className="text-lg break-words">{hash.clicks}</div>
                    <div className="flex items-center gap-4">
                      <Link
                        to={`link/${hash.hash}`}
                        className="text-lg w-max bg-primary py-2 px-4 rounded grid place-items-center"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-lg w-max bg-red-500 py-2 px-4 rounded grid place-items-center"
                        onClick={() => onDelete(hash.hash)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ))
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
