import { useGetAllColorsQuery } from "@/redux/api/color/colorApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import FormMultiSelectField from "./FormMultiSelectField";

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
};

const AvailableColorOptions = ({ name, label }: ACDepartmentFieldProps) => {
  const { data, isLoading } = useGetAllColorsQuery({
    limit: 100,
    page: 1,
  });
  const availableColors = data?.data;
  const availableColor = availableColors?.map((avColor: any) => {

    return {
      label: avColor?.title,
      value: avColor?.title,
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

export default AvailableColorOptions;
