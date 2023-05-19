import React, { useEffect, useState } from "react";
import DataSelect from "../CustomFields/DataSelect";
import { EmpresaService } from "../../service/module/pessoas/Empresa";
import { isSucess } from "../../utils/restUtil";
import { isFilledArray } from "../../utils/utils";
import { bgColor } from "../../consts";

type props = {
  onChange: (empresa: number) => void;
  disabled?: boolean;
};

function CompanySelectorLabel({ onChange, disabled = false }: props) {
  const [companies, setCompanies] = useState();
  const [value, setValue] = useState<number>(1);
  async function handleData() {
    const res = await EmpresaService.GetAll();
    if (res && isSucess(res.status)) {
      setCompanies(res.data);
    }
  }

  useEffect(() => {
    if (!isFilledArray(companies)) {
      handleData();
    }
  }, []);
  useEffect(() => {
    if (value) onChange(value);
  }, [value]);

  return (
    <div>
      <DataSelect
        value={value}
        label="Empresa"
        itemKey={"Código"}
        itemDescription={"Razão Social"}
        data={companies}
        onBeforeChange={(e: number) => setValue(e)}
        disabled={disabled}
      />
    </div>
  );
}

export default CompanySelectorLabel;
