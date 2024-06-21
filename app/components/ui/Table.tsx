/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { Spacer } from './Spacer'
import { FaEllipsisH } from 'react-icons/fa'
import { Text } from './Text'
import { Button } from './Button'


export interface IActionOption {
  label: string
  onClick: (id: number) => void
}

interface Header {
  key: string
  label: string
  render?: RenderFunction;
}

interface DataItem {
  [key: string]: any
}

interface Props {
  headers: Header[]
  data: DataItem[] | undefined
  actionOptions: ActionOption[]
}
interface ActionOption {
  label: string
  onClick: (id: number) => void
}

interface RenderFunction {
  (item: DataItem): React.ReactNode;
}

export const Table: React.FC<Props> = ({ headers, data, actionOptions }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Función para realizar el ordenamiento
  const handleSort = (key: string) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  
  // Filtrar y ordenar la data
  let filteredData: any[] = []
  if(data){
   filteredData = data.filter((item) =>
      Object.values(item).some((value) => {
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    )

  }
 
  if (sortBy) {
    filteredData = filteredData.sort((a, b) =>
      sortOrder === 'asc'
        ? a[sortBy]?.toString().localeCompare(b[sortBy]?.toString())
        : b[sortBy]?.toString().localeCompare(a[sortBy]?.toString())
    )
  }

  // Paginación
  const totalResults = filteredData.length
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)
  const [isOpen, setIsOpen] = useState<string | null>(null)

  const toggleDropdown = (id: string) => {
    setIsOpen((prevId) => (prevId === id ? null : id))
  }

  return (
    <div className="">
      {/* Buscador */}
      <div className="flex justify-between items-center">
        <div className="mt-4 flex items-center">
          <Text className="mr-2" as="span" size='xs'>
            Mostrar:
          </Text>
          <select
            value={resultsPerPage}
            onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
            className="outline-1 mr-4 rounded-md font-raleway text-14 font-medium p-1 text-primary border-[0.8px] border-primary bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart"
          >
            <option value={10} className='bg-gradientbuttonend font-raleway'>10</option>
            <option value={20} className='bg-gradientbuttonend font-raleway'>20</option>
            <option value={50} className='bg-gradientbuttonend font-raleway'>50</option>
            <option value={100} className='bg-gradientbuttonend font-raleway'>100</option>
          </select>
        </div>
        <div className="max-w-[300px] flex justify-between items-center">
          <IoSearchOutline className="text-20 text-contrast w-5" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value) 
              setCurrentPage(1)
            }}
            className="focus:outline-none border-primary font-raleway text-sm md:text-sm text-primary font-medium p-2 px-3 rounded-md flex-1 ml-2 border-[0.8px]  bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonend"
          />
        </div>
      </div>

      {/* Tabla */}
      <table className="w-full mt-4  border-t-[1px] border-t-primary min-w-[400px] overflow-x-scroll ">
        <thead className=" border-b-[1px] border-b-primary h-auto">
          <tr className='bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart'>
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => handleSort(header.key)}
                className={` cursor-pointer py-2 select-none text-left min-w-[50px] ${
                  sortBy === header.key ? 'text-violet-600 flex items-center gap-2' : ''
                }`}
              >
                <Text size='xs' type='title' className='flex' color={`${sortBy === header.key ? 'primary' : 'contrast'}`}>{header.label}</Text>
                {sortBy === header.key && (
                  <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
            <th className="w-7"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-buttonprimary transition-all border-b-[1px] border-b-primary"
            >
              {headers.map((header) => (
                <td
                  key={header.key}
                  className="py-2 font-raleway text-xs md:text-sm text-contrast "
                >
                  {header.key === 'thumbnail' && header.render
                  ? header.render(item) // Renderizar contenido personalizado si es la columna 'thumbnail'
                  : item[header.key]}
                </td>
              ))}
              <td
                className="relative cursor-pointer select-none"
                onClick={() => toggleDropdown(String(item.id))}
              >
                <FaEllipsisH className="text-contrast" />

                {isOpen === `${item.id}` && (
                  <div className="overflow-hidden dropdown-menu bg-gradient-to-bl from-gradientbuttonstart to-gradientbuttonend rounded-lg border-[0.8px] border-b-[0px] border-primary absolute right-0 z-20">
                    {actionOptions.map((option) => (
                      <button
                        key={option.label}
                        className="block p-2 py-2 w-full text-left hover:bg-buttonprimary hover:text-primary text-contrast transition-all border-b-[0.8px] border-primary"
                        onClick={() => {
                          option.onClick(item.id) // Ejecutar la función de la opción de acción
                        }}
                      >
                        <Text as="span" size='xs' color='custom' className='px-4'>{option.label}</Text>
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación y selección de resultados por página */}
      <Spacer className="mt-6" />
      <div className="mt-4 flex items-center">
        <div>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              size='small'
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-bprimary rounded-lg text-white'
                  : ''
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
