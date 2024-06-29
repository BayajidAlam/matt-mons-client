import  { SelectOptions } from "./FormSelectField";
import FormMultiSelectField from "./FormMultiSelectField";
import { useGetAllSizesQuery } from "@/redux/api/size/sizeApi";

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
};

const AvailableSizeOptions = ({ name, label }: ACDepartmentFieldProps) => {
  const { data, isLoading } = useGetAllSizesQuery({
    limit: 100,
    page: 1,
  });
  const availableColors = data?.data;
  const availableColor = availableColors?.map((avSize: any) => {
    return {
      label: avSize?.title,
      value: avSize?.title,
    };
  });

  return (
    <FormMultiSelectField
      name={name}
      label={label}
      options={availableColor as SelectOptions[]}
    />
  );
};

export default AvailableSizeOptions;
