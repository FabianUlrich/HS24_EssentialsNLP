import {Fragment, useCallback, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

const models = [
    {name: 'XLnet fine-tuned', id: "XLnetwFT"},
    {name: 'BERT fine-tuned', id: "BertwFT"},
    {name: 'RoBERTa fine-tuned', id: "RoBERTawFT"},
]

export function ModelSelector({onChangedCallback}) {
    const [selected, setSelected] = useState(models[0])
    const onChange = useCallback((model) => {
        setSelected(model);
        onChangedCallback(model.id);
    }, [onChangedCallback, setSelected])

    useEffect(() => {
        onChangedCallback(selected.id)
    }, []);
    return <>
        <label className="text-sm text-gray-600 mb-1">Model</label>
        <Listbox value={selected} onChange={onChange}>
            <div className="relative mt-1">
                <Listbox.Button
                    className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom={"opacity-0 scale-0"}
                    enterTo={"opacity-100 scale-100"}
                    leave="transition ease-in duration-100"
                    leaveFrom="scale-100 opacity-100"
                    leaveTo="scale-0 opacity-0"
                >
                    <Listbox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {models.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({active}) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={person}
                            >
                                {({selected}) => (
                                    <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {person.name}
                      </span>
                                        {selected ? (
                                            <span
                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox></>

}
