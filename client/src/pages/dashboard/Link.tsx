import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateApi } from "../../api";
import LinkForm from "../../components/LinkForm";

const Link: FC = () => {
  const refetch: () => void = useOutletContext();
  const navigate = useNavigate();
  const { hash } = useParams();

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(!!hash);

  useEffect(() => {
    const fetchHash = async () => {
      try {
        const res = await privateApi.get(`/api/v1/hash/${hash}`);
        setData(res.data.data.hash);
        setLoading(false);
      } catch (err: any) {
        return toast.error(err.response.data.error.message);
      }
    };

    if (hash) {
      fetchHash();
    }
  }, [hash]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  const onCreate = async (values: { url: string }) => {
    try {
      await privateApi.post("/api/v1/hash", values);
      toast.success("Link created");
      refetch();
      navigate("..");
    } catch (err: any) {
      toast.error(err.response.data.error.message);
    }
  };

  const onEdit = async (values: { url: string }) => {
    try {
      await privateApi.put(`/api/v1/hash/${hash}`, values);

      toast.success("Link updated");
      refetch();
    } catch (err: any) {
      toast.error(err.response.data.error.message);
    }
  };

  if (hash) {
    return (
      <LinkForm
        btnLabel="Edit"
        label="Edit Link"
        onSubmit={onEdit}
        initialUrl={data.originalUrl}
      />
    );
  }

  return <LinkForm btnLabel="Create" label="Create Link" onSubmit={onCreate} />;
};

export default Link;
