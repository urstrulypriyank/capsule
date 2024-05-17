import { getData } from "@/utils/fetchSalts";
import SaltListItem from "./SaltListItem";

export default async function SaltListContainer({ searchText }) {
  if (!searchText || searchText.length == 0) return;
  const data = await getData(searchText);
  return (
    <div className="md:w-[80%] w-[95vw]  mx-auto mt-10   ">
      {data?.map((item, index) => {
        return (
          <SaltListItem
            key={item.id}
            // name of salt
            saltName={item.salt}
            // all availabel forms
            saltForms={item.available_forms}
            // available strength
            strength={item.most_common.Strength.split("+")}
            // salt form json to get data
            saltFormsJson={item.salt_forms_json}
          />
        );
      })}
    </div>
  );
}
