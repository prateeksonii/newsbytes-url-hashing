import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface LinkFormValues {
  url: string;
}

interface CreateLinkFormProps {
  onSubmit: (values: LinkFormValues) => void;
  initialUrl?: string;
  label: string;
  btnLabel: string;
}

const CreateLinkForm: FC<CreateLinkFormProps> = ({
  onSubmit,
  initialUrl,
  label,
  btnLabel,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<LinkFormValues>({
    defaultValues: {
      url: initialUrl ?? "",
    },
  });

  useEffect(() => {
    if (initialUrl) {
      setValue("url", initialUrl);
    }
  }, [initialUrl]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{label}</h1>
      <form
        className="text-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            className="bg-dark2 text-lg p-2 rounded"
            {...register("url", {
              required: "Url is required",
            })}
          />
          <div className="text-red-500">{errors?.url?.message}</div>
        </div>
        <button
          type="submit"
          className="mt-3 bg-primary py-3 text-lg font-medium rounded"
        >
          {btnLabel}
        </button>
      </form>
    </>
  );
};

export default CreateLinkForm;
