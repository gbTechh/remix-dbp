/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { Spacer } from "./Spacer";
import { DividerX } from "./DividerX";
import { CheckBox } from "./form";
import { Text } from "./Text";
import { Button } from "./Button";

interface DataItem {
  [key: string]: any
}


interface RenderFunction {
  (item: DataItem): React.ReactNode;
}

interface Header {
  key: string
  label: string
  render?: RenderFunction;
}

interface Props<T> {
  data: T[];
  totalItems: number;
  headers: Header[];
  setData?: React.Dispatch<React.SetStateAction<TsetDataTable>>
  nameData: string
}

export type TsetDataTable = {
  [key: string]: boolean;
}

export const TableCheckbox = <T extends DataItem>({ data, headers, totalItems, setData, nameData }: Props<T>) => {


  const [checkAllNames, setCheckAllNames] = useState(false);
  const [totalItemsState] = useState(totalItems)

  const [leftSlice, setLeftSlice] = useState(0);
  const [rightSlice, setRightSlice] = useState(totalItemsState);
  const [selectedData, setSelectedData] = useState<{ [key: string]: boolean }>({});
  const [allPagesCountries] = useState(Math.ceil(data.length / totalItemsState));
  const handleNextButton = () => {
    if (rightSlice < data.length) {
      setLeftSlice(leftSlice + totalItemsState);
      setRightSlice(rightSlice + totalItemsState);
      updateSelectedData();
    }
  };

  const handleBackButton = () => {
    if (leftSlice > 0) {
      setRightSlice(rightSlice - totalItemsState);
      setLeftSlice(leftSlice - totalItemsState);
      updateSelectedData();
    }
  };

  useEffect(() => {
    setCurrentPage(rightSlice / totalItemsState)
    setCheckAllNames(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSlice])
  useEffect(() => {
    setCheckAllNames(false);
  }, [leftSlice])


  const updateSelectedData = () => {
    const updatedSelectedData = { ...selectedData };
    allData.forEach(data => {
      updatedSelectedData[data.id] = selectedData[data.id] || false;
    });
    setSelectedData(updatedSelectedData);
  };

  const handleCurrencySelection = (id: number) => {
    setSelectedData({
      ...selectedData,
      [id]: !selectedData[id]
    });
  };

  const allData = data.slice(leftSlice, rightSlice);
  const [currentPage, setCurrentPage] = useState(rightSlice / totalItemsState)


  const handleSelectAllNames = () => {
    let updatedSelectedData: { [key: string]: boolean } = {};
    const currentPageCurrencies = data.slice(leftSlice, rightSlice);
    currentPageCurrencies.forEach(data => {
      updatedSelectedData = selectedData
      updatedSelectedData[data.id] = !checkAllNames;
    });
    setSelectedData(updatedSelectedData);
    setCheckAllNames(!checkAllNames);
  };

  useEffect(() => {
    if(setData){
      setData(selectedData)
    }
  }, [selectedData, setData])
  

  return (

    <div className="flex flex-col w-full flex-1 h-full ">
      <Spacer y={2} />
      <DividerX />
      <table className=" w-full">

       
        <thead className=" h-auto">
          <tr className=''>
            {headers.map((header) => (
              <th
                key={header.key}
                className={`py-2 select-none text-left min-w-[50px]`}
              > 
                {
                  header.key === 'checkbox' ? (
                  <>
                      <CheckBox onChange={handleSelectAllNames} isChecked={checkAllNames} name="all_names" label={header.label} classLabel="min-w-[220px]" />
                  </>
                  ) : (<Text as="span" color="contrast" size="sm" className="cursor-pointer select-none font-bold capitalize">{header.label}</Text>)
                }
                
              </th>
            ))}
            <th className="w-7"></th>
          </tr>
        </thead>
        <tbody className="h-full">
          {
            allData.map((item) => (
              <tr key={item.id} className="hover:bg-buttonprimary transition-all">
                
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="py-2 font-raleway text-xs md:text-sm text-contrast border-t-[0.8px] border-t-primary"
                  >
                    {header.key === 'checkbox' ? 
                      (<>
                        <CheckBox  name="checkbox_currencies" isChecked={selectedData[item.id] || false}
                          onChange={() => handleCurrencySelection(item.id)} classLabel="w-full" value={`${item.id}`}>
                          <div className="flex py-1">
                            {item[header.key]}
                          </div>
                        </CheckBox>
                      </>) : item[header.key]}
                  </td>
                ))}                 

              </tr>
            ))
          }
        </tbody>
       
      </table>
      <input type='hidden' name='currency_countries' value={JSON.stringify(Object.entries(selectedData).filter(e => e[1]).map(e => e[0]))} />
      <div className="w-full justify-between items-center py-4 flex">
        <Text size="xs" color="contrast">{`${leftSlice === 0 ? 1 : leftSlice} - ${rightSlice > data.length ? data.length : rightSlice} de ${data.length} ${nameData}`}</Text>
        <div className="flex">
          <Text size="xs" color="contrast" className="flex mr-2 items-center">{`${currentPage} - ${allPagesCountries}`}</Text>
          <Button type="button" size="small" onClick={handleBackButton} className={`${leftSlice === 0 && 'opacity-50 hover:bg-none'}`}><BsArrowLeftShort className="text-base" /></Button>
          <Button type="button" size="small" onClick={handleNextButton} className={`${rightSlice > data.length && 'opacity-50 hover:bg-none'}`}><BsArrowRightShort className="text-base" /></Button>

        </div>
      </div>
    </div>

  )
}